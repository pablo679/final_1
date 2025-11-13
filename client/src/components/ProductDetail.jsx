
import { useCart } from '../context/CartContext.jsx';

// 1. Recibe 'onDelete' y ya NO recibe 'onBack'
function ProductDetail({ product, onDelete, isAdmin }) {
  
  const { addToCart } = useCart();
  const imageUrl = product.image.startsWith('http') ? product.image : `/${product.image}`;

  return (
    <div className="product-detail-container container">
      <div className="product-detail-layout">
        
        <div className="product-image-gallery">
          <img src={imageUrl} alt={product.name} />
        </div>

        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="price">
            {new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(product.price)}
          </p>
          <p className="description">{product.description}</p>
          
          <div className="product-specs">
            <h3>Especificaciones</h3>
            <ul>
              {/* Iteramos sobre las especificaciones del producto */}
              {Object.entries(product.specs).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong>
                  <span>{value}</span>
                </li>
              ))}
            </ul>
          </div>

          <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
            Añadir al Carrito
          </button>
          
          {/* Muestra este botón SÓLO si 'isAdmin' es true */}
          {isAdmin && (
            <button 
              className="btn" 
              onClick={onDelete} 
              style={{marginTop: '1rem', width: '100%', backgroundColor: '#a94442', color: 'white'}}
            >
              Eliminar Producto (Admin)
            </button>
          )}

        </div>

      </div>
    </div>
  );
}

export default ProductDetail;