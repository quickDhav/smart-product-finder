function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="product-category">{product.category}</div>
      <h3>{product.name}</h3>
      <p className="product-brand">{product.brand}</p>
      <p className="product-desc">{product.description}</p>
      <p className="product-price">${product.price}</p>
    </div>
  )
}

export default ProductCard
