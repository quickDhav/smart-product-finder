import ProductCard from './ProductCard'

function ProductList({ products, title }) {
  if (products.length === 0) {
    return (
      <div className="no-results">
        <p>No products found. Try a different search!</p>
      </div>
    )
  }

  return (
    <div className="product-section">
      <h2>{title}</h2>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default ProductList
