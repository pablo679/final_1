
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom'; // 1. Importar Routes y Route

// Importamos Componentes de UI
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ContactForm from './components/ContactForm'; // 2. ContactForm ahora es una "página"

// Importamos Páginas
import CatalogPage from './pages/CatalogPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CreateProductPage from './pages/CreateProductPage';
import NotFoundPage from './pages/NotFoundPage'; // Una página para 404

function App() {
  // 4. El estado del carrito se queda aquí
  const [cart, setCart] = useState([]);

  // 5. Los estados de products, selectedProduct, loading, y error desaparecen
  //    Cada página manejará su propia carga de datos.

  const handleAddToCart = (productToAdd) => {
    setCart([...cart, productToAdd]);
    alert(`${productToAdd.name} fue añadido al carrito.`);
  };

  return (
    <>
      {/* Navbar se muestra en TODAS las páginas */}
      <Navbar cartItemCount={cart.length} />

      <main>
        {/* 6. Aquí definimos nuestras rutas */}
        <Routes>
          
          {/* Ruta para el catálogo completo */}
          <Route path="/productos" element={<CatalogPage />} />
          
          {/* Ruta para el detalle de producto. :id es un parámetro dinámico */}
          <Route 
            path="/productos/:id" 
            element={<ProductDetailPage onAddToCart={handleAddToCart} />} 
          />
          
          {/* Ruta para el formulario de contacto */}
          <Route path="/contacto" element={<ContactForm />} />

          {/* Ruta para el formulario de creación*/}
          <Route path="/admin/crear-producto" element={<CreateProductPage />} />

          {/* Ruta para la página de inicio (usará el mismo componente que el catálogo por ahora) */}
          <Route path="/" element={<CatalogPage />} /> 
          
          {/* Ruta para cualquier URL no encontrada (404) */}
          <Route path="*" element={<NotFoundPage />} /> 

        </Routes>
      </main>

      {/* Footer se muestra en TODAS las páginas */}
      <Footer />
    </>
  );
}

export default App;