import React from 'react';

// Shopping cart component
function Cart({ showCart, cart, increaseQty, decreaseQty, removeItem, clearCart, cartTotal }) {
  if (!showCart) return null;

  return (
    <div style={{ border: '2px solid black', padding: '15px', marginBottom: '20px' }}>
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>${item.price}</td>
                  <td>
                    <button onClick={() => decreaseQty(item.id)} style={{ padding: '2px 8px' }}>-</button>
                    <span style={{ margin: '0 10px' }}>{item.quantity}</span>
                    <button onClick={() => increaseQty(item.id)} style={{ padding: '2px 8px' }}>+</button>
                  </td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button onClick={() => removeItem(item.id)} style={{ color: 'red' }}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: '15px' }}>
            <h3>Total Amount: ${cartTotal.toFixed(2)}</h3>
            <button onClick={clearCart} style={{ padding: '5px 10px' }}>Empty Cart</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
