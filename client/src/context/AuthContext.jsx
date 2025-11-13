// /client/src/context/AuthContext.jsx

import React, { createContext, useState, useContext } from 'react';

// 1. Creamos el Context
const AuthContext = createContext();

// 2. Creamos el "Proveedor" (el componente que "envuelve" la app)
export const AuthProvider = ({ children }) => {
    // 3. Definimos el estado
    // Intentamos leer la info del usuario desde localStorage al cargar la app
    const [userInfo, setUserInfo] = useState(() => {
        try {
            const storedUser = localStorage.getItem('userInfo');
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (error) {
            console.error("Error al parsear userInfo de localStorage", error);
            return null;
        }
    });

    const [isAuthenticated, setIsAuthenticated] = useState(!!userInfo);

    // 4. Definimos las funciones (Login, Register, Logout)
    
    // NOTA: Por ahora, estas funciones solo simularán la lógica.
    // Las conectaremos a nuestra API de backend cuando creemos las páginas de Login/Registro.

    const login = (userData) => {
        // Esta función será llamada por nuestra página de Login
        setUserInfo(userData);
        setIsAuthenticated(true);
        localStorage.setItem('userInfo', JSON.stringify(userData));
    };

    const register = (userData) => {
        // Esta función será llamada por nuestra página de Registro
        setUserInfo(userData);
        setIsAuthenticated(true);
        localStorage.setItem('userInfo', JSON.stringify(userData));
    };

    const logout = async () => {
        try {
            // 1. Llamamos a la API de logout del backend
            await fetch(`${import.meta.env.VITE_API_URL}/api/users/logout`, {
                method: 'POST',
                credentials: 'include'
            });
        } catch (error) {
            console.error("Error al hacer logout en el backend:", error);
        }

        // 2. Limpiamos el estado local y el localStorage
        setUserInfo(null);
        setIsAuthenticated(false);
        localStorage.removeItem('userInfo');
    };

    // 5. Exponemos el estado y las funciones a través del "Provider"
    return (
        <AuthContext.Provider value={{
            userInfo,
            isAuthenticated,
            login,
            register,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};

// 6. Creamos un "hook" personalizado para que sea fácil de usar
// En lugar de "useContext(AuthContext)", solo escribiremos "useAuth()"
export const useAuth = () => {
    return useContext(AuthContext);
};