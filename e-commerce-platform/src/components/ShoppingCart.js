import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// ShoppingCart component to manage cart state
const ShoppingCart = ({ cart, setCart }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  // Calculate total price whenever the cart changes
  useEffect(() => {
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(total);
  }, [cart]);

  // Function to update product quantity in the cart
  const updateQuantity = (id, quantity) => {
    if (quantity === 0) {
      setCart(cart.filter(item => item.id !== id));
    } else {
      setCart(cart.map(item => item.id === id ? { ...item, quantity } : item));
    }
  };

  // Function to remove a product from the cart
  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      <ul>
        {cart.map(item => (
          <li key={item.id}>
            <img src={item.imageUrl} alt={item.name} />
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p>${item.price}</p>
            <p>Quantity: {item.quantity}</p>
            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      {/* Display the total price */}
      <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
      {/* Purchase button */}
      <button onClick={() => navigate('/checkout')}>Purchase</button>
    </div>
  );
};

export default ShoppingCart;
