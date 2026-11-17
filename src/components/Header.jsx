import React from 'react';

// Header component showing app title and cart toggle button
function Header({ cartCount, cartTotal, showCart, setShowCart }) {
  return (
    <header style={{ borderBottom: '2px solid black', paddingBottom: '10px', marginBottom: '20px' }}>
      <h1>ShopSmart</h1>
      <p>Simple Online Store</p>
      <button 
        onClick={() => setShowCart(!showCart)}
        style={{ padding: '8px 12px', cursor: 'pointer' }}
      >
        {showCart ? 'Hide Cart' : 'View Cart'} ({cartCount} items - ${cartTotal.toFixed(2)})
      </button>
    </header>
  );
}

export default Header;
