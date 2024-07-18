import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Import images directly
import leather from '../product_images/leather.jpg';
import watch from '../product_images/watch.jpg';
import headphones from '../product_images/headphones.jpg';
import laptop from '../product_images/laptop.jpg';
import tv from '../product_images/tv.jpg';
import espresso from '../product_images/espresso.jpg';

// Map image filenames to imported images
const images = {
  'leather.jpg': leather,
  'watch.jpg': watch,
  'headphones.jpg': headphones,
  'laptop.jpg': laptop,
  'tv.jpg': tv,
  'espresso.jpg': espresso
};

// Checkout component to capture user details and display a summary of the cart
const Checkout = ({ cart, setCart, clearCart }) => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    address: '',
    email: ''
  });
  const [errors, setErrors] = useState({});
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

  // Handle quantity change for cart items
  const handleQuantityChange = (id, quantity) => {
    const updatedCart = cart.map(item =>
      item.id === id ? { ...item, quantity: Number(quantity) } : item
    );
    setCart(updatedCart);
  };

  // Handle remove item from cart
  const handleRemoveItem = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
  };

  // Validation logic
  const validate = () => {
    const errors = {};
    if (!userDetails.name) errors.name = "Name is required";
    if (!userDetails.address) errors.address = "Address is required";
    if (!userDetails.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(userDetails.email)) {
      errors.email = "Email is invalid";
    }
    return errors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      clearCart();
      setSubmitted(true);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      {submitted ? (
        <div className="text-center mt-4">
          <h2 className="text-3xl font-bold text-teal-500 mb-4">Thank you for your purchase!</h2>
          <p className="text-lg text-gray-700 mb-4">Your order has been successfully placed.</p>
          <p className="text-lg text-gray-700 mb-4">A confirmation email has been sent to <span className="font-semibold">{userDetails.email}</span>.</p>
          <button 
            onClick={() => navigate('/')} 
            className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          {/* Display a summary of the cart */}
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <ul className="space-y-4 mb-4">
            {cart.map(item => {
              const imageUrl = images[item.imageUrl];
              return (
                <li key={item.id} className="bg-white p-4 rounded shadow flex flex-col lg:flex-row items-center gap-4">
                  {/* Product image */}
                  <img src={imageUrl} alt={item.name} className="w-24 h-24 object-cover rounded" />
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-600">Quantity: 
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                        className="ml-2 p-1 border rounded"
                      />
                    </p>
                    <p className="text-lg font-bold">Price: ${item.price.toFixed(2)}</p>
                  </div>
                  <button onClick={() => handleRemoveItem(item.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded">
                    Remove
                  </button>
                </li>
              );
            })}
          </ul>
          {/* Display the total price */}
          <h2 className="text-2xl font-bold">Total Price: ${totalPrice.toFixed(2)}</h2>
          {/* Checkout form */}
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Name:</label>
              <input
                type="text"
                name="name"
                value={userDetails.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              {errors.name && <p className="text-red-500">{errors.name}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Address:</label>
              <input
                type="text"
                name="address"
                value={userDetails.address}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              {errors.address && <p className="text-red-500">{errors.address}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Email:</label>
              <input
                type="email"
                name="email"
                value={userDetails.email}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
          </form>
          {/* Back to Cart button */}
          <button onClick={() => navigate('/cart')} className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Back to Cart
          </button>
        </>
      )}
    </div>
  );
};

export default Checkout;
