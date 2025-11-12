
// 1. Recibe 'onDelete' y ya NO recibe 'onBack'
function ProductDetail({ product, onAddToCart, onDelete }) {
  
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

          <button className="add-to-cart-btn" onClick={() => onAddToCart(product)}>
            Añadir al Carrito
          </button>
          
          {/* 2. Botón "Volver" eliminado */}

          {/* 3. nuevo Botón de Eliminar */}
          <button 
            className="btn" 
            onClick={onDelete} 
            style={{marginTop: '1rem', width: '100%', backgroundColor: '#a94442', color: 'white'}}
          >
            Eliminar Producto (Admin)
          </button>
        </div>

      </div>
    </div>
  );
}

export default ProductDetail;