
import ProductCard from './ProductCard';

// 1. Ya no recibe 'onSelectProduct'
function ProductList({ products }) {
  return (
    <section className="catalog-section">
        <div className="container">
            <div className="catalog-header">
                <h1>Nuestro Catálogo</h1>
            </div>
            <div className="products-grid" id="products-catalog-grid">
                {products.map(product => (
                    <ProductCard
                        key={product.id} // Mongoose nos da 'id' gracias al virtual
                        product={product}
                        // 2. Eliminamos onSelectProduct
                    />
                ))}
            </div>
        </div>
    </section>
  );
}

export default ProductList;