import React from 'react';

// Shows full details of one selected product
function ProductDetails({ product, onClose, onAddToCart }) {
  if (!product) return null;

  return (
    <div style={{ border: '2px solid blue', padding: '15px', marginBottom: '20px' }}>
      <button onClick={onClose} style={{ marginBottom: '10px', padding: '5px 10px', cursor: 'pointer' }}>
        &larr; Back to Products
      </button>

      <h2>{product.title}</h2>
      <img 
        src={product.thumbnail} 
        alt={product.title} 
        style={{ width: '200px', height: '180px', objectFit: 'contain' }}
      />
      <p><b>Brand:</b> {product.brand || 'No brand'}</p>
      <p><b>Category:</b> {product.category}</p>
      <p><b>Description:</b> {product.description}</p>
      <p><b>Price:</b> ${product.price} ({product.discountPercentage}% discount)</p>
      <p><b>Rating:</b> ⭐ {product.rating} / 5</p>
      <p><b>Stock:</b> {product.stock} items left</p>
      <p><b>Warranty:</b> {product.warrantyInformation || 'Standard warranty'}</p>
      <p><b>Return Policy:</b> {product.returnPolicy || '7 days return'}</p>

      <button 
        onClick={() => onAddToCart(product)} 
        style={{ padding: '8px 16px', fontSize: '14px', cursor: 'pointer' }}
      >
        Add to Cart
      </button>

      {/* Customer reviews */}
      {product.reviews && product.reviews.length > 0 && (
        <div style={{ marginTop: '15px' }}>
          <h3>Reviews:</h3>
          {product.reviews.map((rev, i) => (
            <div key={i} style={{ borderTop: '1px solid gray', paddingTop: '5px' }}>
              <p><b>{rev.reviewerName}</b> ({rev.rating} ⭐): {rev.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
