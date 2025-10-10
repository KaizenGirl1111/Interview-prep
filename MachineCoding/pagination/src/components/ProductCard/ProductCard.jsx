import './ProductCard.css'
function ProductCard({ product }) {
  return (
    <div className="product-card" key={product.id}>
      <p className="product-title">{product.title}</p>
      <img src={product.thumbnail} className="product-img" />
    </div>
  );
}

export default ProductCard;
