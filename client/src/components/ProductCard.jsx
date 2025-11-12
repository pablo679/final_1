
import { Link } from 'react-router-dom'; // 1. ¡Importamos Link!

// 2. Ya no recibe 'onSelectProduct'
function ProductCard({ product }) {
  
  // Verificamos la ruta de la imagen. 
  const imageUrl = product.image.startsWith('http') ? product.image : `/${product.image}`;

  return (
    // 3. Reemplazamos <a> por <Link> y usamos 'to' para la URL dinámica
    <Link to={`/productos/${product.id}`} className="product-card">
      <img src={imageUrl} alt={product.name} />
      <div className="product-card-info">
        <h3>{product.name}</h3>
        <p>{new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(product.price)}</p>
      </div>
    </Link>
  );
}

export default ProductCard;