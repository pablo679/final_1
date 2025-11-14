
import React from 'react';
import { Routes, Route } from 'react-router-dom'; // 1. Importar Routes y Route

// Importamos Componentes de UI
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Importamos Páginas
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CreateProductPage from './pages/CreateProductPage';
import ContactForm from './components/ContactForm'; // 2. ContactForm ahora es una "página"
import NotFoundPage from './pages/NotFoundPage'; // Una página para 404
import RegisterPage from './pages/RegisterPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import AdminRoute from './components/ProtectedRoute.jsx';
import CartPage from './pages/CartPage.jsx';


function App() {

  return (
    <>
      {/* Navbar se muestra en TODAS las páginas */}
      <Navbar />

      <main>
        {/* 6. Aquí definimos nuestras rutas */}
        <Routes>
          
          {/* Ruta para el catálogo completo */}
          <Route path="/productos" element={<CatalogPage />} />
          
          {/* Ruta para el detalle de producto. :id es un parámetro dinámico */}
          <Route path="/productos/:id" element={<ProductDetailPage />} />
          
          {/* Ruta para el formulario de contacto */}
          <Route path="/contacto" element={<ContactForm />} />
          
          <Route path="/registro" element={<RegisterPage />} />
          
          <Route path="/login" element={<LoginPage />} />

          {/* Ruta para la página de inicio*/}
          <Route path="/" element={<HomePage />} /> 

          <Route path="/cart" element={<CartPage />} />
          
          {/* Ruta para cualquier URL no encontrada (404) */}
          <Route path="*" element={<NotFoundPage />} /> 

          {/* --- INICIO DE RUTA PROTEGIDA --- */}
          <Route path="" element={<AdminRoute />}>
              {/* Todas las rutas que pongamos aquí dentro requerirán login */}
              <Route path="/admin/crear-producto" element={<CreateProductPage />} />
              {/* Si tuviéramos más rutas de admin, irían aquí (ej: /admin/editar-producto/:id) */}
          </Route>
          {/* --- FIN DE RUTA PROTEGIDA --- */}

        </Routes>
      </main>

      {/* Footer se muestra en TODAS las páginas */}
      <Footer />
    </>
  );
}

export default App;