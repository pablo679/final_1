
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

function CartPage() {
    const { cartItems, addToCart, removeFromCart, clearCart } = useCart();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    // Calculamos el precio total
    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

    const handleCheckout = async () => {
        if (!isAuthenticated) {
            // Si no está logueado, lo mandamos a la página de login
            alert('Debes iniciar sesión para finalizar la compra.');
            navigate('/login');
            return;
        }

        try {
            // 1. Llamamos a nuestra API para crear el pedido
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // ¡Importante! El backend necesita la cookie 'jwt'
                    // Vite se la enviará automáticamente si el backend está en un dominio diferente
                    // (lo cual es nuestro caso: Vercel y Render)
                    // Pero para localhost, necesitamos 'credentials: include'
                },
                credentials: 'include',
                body: JSON.stringify({
                    orderItems: cartItems.map(item => ({
                        id: item.id,
                        name: item.name,
                        qty: item.qty,
                        image: item.image,
                        price: item.price
                    })),
                    totalPrice: totalPrice
                })
            });

            const data = await response.json();

            if (!response.ok) {
                // Si la API falla (ej: error 401 si el token no es válido)
                throw new Error(data.message || 'Error al crear el pedido');
            }

            // 2. Si el pedido se crea con éxito
            alert('¡Pedido realizado con éxito!');
            clearCart(); // Limpiamos el carrito
            navigate('/'); // Lo mandamos al inicio

        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <section className="contact-section">
            <div className="container">
                <div className="contact-header">
                    <h1>Tu Carrito</h1>
                </div>

                {cartItems.length === 0 ? (
                    <div className="cart-empty">
                        <p>Tu carrito está vacío.</p>
                        <Link to="/productos" className="btn btn-primary">Ver productos</Link>
                    </div>
                ) : (
                    <div className="cart-layout">
                        <div className="cart-items-list">
                            {cartItems.map(item => (
                                <div key={item.id} className="cart-item">
                                    <img src={`/${item.image}`} alt={item.name} className="cart-item-image" />
                                    <div className="cart-item-info">
                                        <Link to={`/productos/${item.id}`}>{item.name}</Link>
                                        <p>{new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(item.price)} x {item.qty}</p>
                                        <div className="cart-item-qty">
                                            <button onClick={() => removeFromCart(item.id)} className="qty-btn">-</button>
                                            <span>{item.qty}</span>
                                            <button onClick={() => addToCart(item, false)} className="qty-btn">+</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="cart-summary">
                            <h3>Resumen del Pedido</h3>
                            <h2>Total: {new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(totalPrice)}</h2>
                            <button 
                                onClick={handleCheckout} 
                                className="btn btn-primary" 
                                style={{ width: '100%' }}
                            >
                                {isAuthenticated ? 'Finalizar Compra' : 'Iniciar Sesión para Comprar'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

export default CartPage;