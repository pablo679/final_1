// /client/src/pages/RegisterPage.jsx

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx'; // 1. Importamos el hook de autenticación

function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    
    const { register } = useAuth(); // 2. Obtenemos la función 'register' del contexto
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Limpiamos errores previos

        if (password.length < 6) {
             setError("La contraseña debe tener al menos 6 caracteres.");
             return;
        }

        try {
            // 3. Llamamos a nuestra API de backend para registrar
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ name, email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                // Si el backend devuelve un error (ej: "El usuario ya existe")
                throw new Error(data.message || 'Error al registrar');
            }

            // 4. Si el registro en el backend fue exitoso, actualizamos el contexto
            register(data);

            // 5. Redirigimos al usuario a la página de inicio
            navigate('/');

        } catch (err) {
            setError(err.message);
        }
    };

    // Usamos las clases de CSS que ya tenemos (contact-form, etc.)
    return (
        <section className="contact-section">
            <div className="container">
                <div className="contact-header">
                    <h1>Crear Cuenta</h1>
                </div>
                
                <form className="contact-form" onSubmit={handleSubmit}>
                    {error && <p className="form-message error" style={{display: 'block'}}>{error}</p>}
                    
                    <div className="form-group">
                        <label htmlFor="name">Nombre</label>
                        <input 
                            type="text" id="name" value={name}
                            onChange={(e) => setName(e.target.value)} required 
                        />
                    </div>
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
                    <button type="submit" className="btn btn-primary">Registrarse</button>
                </form>
                
                <p style={{textAlign: 'center', marginTop: '1rem'}}>
                    ¿Ya tienes una cuenta? <Link to="/login" style={{color: 'var(--siena-tostado)'}}>Inicia Sesión</Link>
                </p>
            </div>
        </section>
    );
}

export default RegisterPage;