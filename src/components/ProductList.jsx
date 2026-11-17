import React from 'react';
import ProductCard from './ProductCard';

// Component that displays list of products
function ProductList({ products, loading, onViewDetails, onAddToCart }) {
  if (loading) {
    return <h3>Loading products, please wait...</h3>;
  }

  if (products.length === 0) {
    return <p>No products found.</p>;
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onViewDetails={onViewDetails}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}

export default ProductList;
