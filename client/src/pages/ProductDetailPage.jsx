
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductDetail from '../components/ProductDetail'; // Importa el componente de UI
import Loader from '../components/Loader'
import { useAuth } from '../context/AuthContext.jsx';

function ProductDetailPage() {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Hooks de React Router:
    const { id } = useParams(); // <-- ¡Lee el :id de la URL!
    const navigate = useNavigate(); // <-- Para redirigir al usuario
    const { isAuthenticated, userInfo } = useAuth();

    useEffect(() => {
        // Busca solo el producto específico usando el ID de la URL
        fetch(`${import.meta.env.VITE_API_URL}/api/productos/${id}`)
            .then(res => {
                if (!res.ok) throw new Error('Producto no encontrado');
                return res.json();
            })
            .then(data => {
                setProduct(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]); // Se re-ejecuta si el ID de la URL cambia

    // --- ¡NUEVO: Lógica de Borrado! ---
    const handleDelete = async () => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/productos/${id}`, {
                    method: 'DELETE',
                    credentials: 'include'
                });
                if (!response.ok) throw new Error('Error al eliminar');
                alert('Producto eliminado exitosamente');
                navigate('/productos'); // Redirige al catálogo 
            } catch (err) {
                alert(err.message);
            }
        }
    };

    if (loading) return <Loader />;
    if (error) return <div>Error: {error}</div>;

    const isAdmin = isAuthenticated && userInfo?.isAdmin;

    // Necesitamos asegurarnos de que el producto no sea nulo antes de renderizar
    if (!product) return <div>Producto no encontrado.</div>;

    return (
        <ProductDetail 
            product={product} 
            onDelete={handleDelete} // Pasamos la nueva función de borrado
            isAdmin={isAdmin}
        />
    );
}

export default ProductDetailPage;