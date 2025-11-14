
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Este componente ahora protegerá las rutas de ADMIN
const AdminRoute = () => {
    // Leemos el estado completo de autenticación
    const { isAuthenticated, userInfo } = useAuth();

    // 1. ¿Está logueado?
    // 2. ¿Tiene información de usuario?
    // 3. ¿Es admin?
    if (isAuthenticated && userInfo && userInfo.isAdmin) {
        return <Outlet />; // Si todo es sí, muestra la página (ej: CreateProductPage)
    } else if (isAuthenticated) {
        return <Navigate to="/" replace />; // Si está logueado pero NO es admin, lo mandamos al inicio
    } else {
        return <Navigate to="/login" replace />; // Si no está logueado, lo mandamos al login
    }
};

export default AdminRoute;