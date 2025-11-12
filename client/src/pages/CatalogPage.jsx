
import React, { useState, useEffect } from 'react';
import ProductList from '../components/ProductList'; // Importa el componente de UI

function CatalogPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Esta página es ahora responsable de buscar sus propios datos
        fetch('http://localhost:3001/api/productos')
            .then(res => {
                if (!res.ok) throw new Error('Respuesta de la red no fue exitosa');
                return res.json();
            })
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                setError('No se pudieron cargar los productos.');
                setLoading(false);
            });
    }, []); // El array vacío asegura que se ejecute solo una vez

    if (loading) return <div>Cargando productos...</div>;
    if (error) return <div>Error: {error}</div>;

    // Pasa los productos al componente ProductList que solo se encarga de mostrar
    return <ProductList products={products} />;
}

export default CatalogPage;