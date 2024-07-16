import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Checkout component to capture user details and display a summary of the cart
const Checkout = ({ cart, clearCart }) => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    address: '',
    email: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  // Calculate total price of the cart
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Handle input change for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (userDetails.name && userDetails.address && userDetails.email) {
      clearCart();
      setSubmitted(true);
    }
  };

  return (
    <div>
      <h1>Checkout</h1>
      {submitted ? (
        <p>Thank you for your purchase!</p>
      ) : (
        <>
          {/* Display a summary of the cart */}
          <h2>Order Summary</h2>
          <ul>
            {cart.map(item => (
              <li key={item.id}>
                <h3>{item.name}</h3>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${item.price.toFixed(2)}</p>
              </li>
            ))}
          </ul>
          {/* Display the total price */}
          <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
          {/* Checkout form */}
          <form onSubmit={handleSubmit}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={userDetails.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Address:</label>
              <input
                type="text"
                name="address"
                value={userDetails.address}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={userDetails.email}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Submit</button>
          </form>
          {/* Back to Cart button */}
          <button onClick={() => navigate('/cart')}>Back to Cart</button>
        </>
      )}
    </div>
  );
};

export default Checkout;
