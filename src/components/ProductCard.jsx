import React from 'react';

// Single product card item
function ProductCard({ product, onViewDetails, onAddToCart }) {
  return (
    <div style={{ border: '1px solid black', padding: '10px', width: '220px', margin: '10px' }}>
      <img 
        src={product.thumbnail} 
        alt={product.title} 
        style={{ width: '100%', height: '140px', objectFit: 'contain' }}
      />
      <h4>{product.title}</h4>
      <p>Category: {product.category}</p>
      <p><b>Price: ${product.price}</b></p>
      <p>Rating: ⭐ {product.rating} / 5</p>

      <div style={{ marginTop: '10px' }}>
        <button 
          onClick={() => onViewDetails(product)} 
          style={{ marginRight: '5px', padding: '5px', cursor: 'pointer' }}
        >
          View Details
        </button>
        <button 
          onClick={() => onAddToCart(product)} 
          style={{ padding: '5px', cursor: 'pointer' }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
