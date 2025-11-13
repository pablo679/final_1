// /client/src/pages/LoginPage.jsx

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx'; // 1. Importamos el hook

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    
    const { login } = useAuth(); // 2. Obtenemos la función 'login' del contexto
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            // 3. Llamamos a nuestra API de backend para hacer login
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                // (ej: "Email o contraseña inválidos")
                throw new Error(data.message || 'Error al iniciar sesión');
            }

            // 4. Si el login fue exitoso, actualizamos el contexto
            login(data);

            // 5. Redirigimos al usuario
            navigate('/');

        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <section className="contact-section">
            <div className="container">
                <div className="contact-header">
                    <h1>Iniciar Sesión</h1>
                </div>
                
                <form className="contact-form" onSubmit={handleSubmit}>
                    {error && <p className="form-message error" style={{display: 'block'}}>{error}</p>}
                    
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" id="email" value={email}
                            onChange={(e) => setEmail(e.target.value)} required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input 
                            type="password" id="password" value={password}
                            onChange={(e) => setPassword(e.target.value)} required 
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
                </form>

                <p style={{textAlign: 'center', marginTop: '1rem'}}>
                    ¿No tienes una cuenta? <Link to="/registro" style={{color: 'var(--siena-tostado)'}}>Regístrate</Link>
                </p>
            </div>
        </section>
    );
}

export default LoginPage;