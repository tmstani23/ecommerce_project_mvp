import React, { useState, useEffect } from 'react';
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
    <div className="container mx-auto px-4 py-6">
      {/* Page title */}
      <h1 className="text-3xl font-bold mb-4 text-white">Shopping Cart</h1>
      
      {/* Shopping cart items */}
      <ul className="space-y-4">
        {cart.map(item => {
          const imageUrl = images[item.imageUrl];
          console.log(`Image URL for ${item.name}: ${imageUrl}`); // Log the image URL
          return (
            <li key={item.id} className="bg-white p-4 rounded shadow-lg flex flex-col lg:flex-row items-center gap-4">
              {/* Product image */}
              <img src={imageUrl} alt={item.name} className="w-24 h-24 object-cover rounded" />
              
              <div className="flex-1">
                {/* Product name */}
                <h2 className="text-xl font-semibold text-gray-900">{item.name}</h2>
                
                {/* Product description */}
                <p className="text-gray-600">{item.description}</p>
                
                {/* Product price */}
                <p className="text-lg font-bold text-gray-900">${item.price.toFixed(2)}</p>
                
                {/* Product quantity */}
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)} 
                    className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-1 px-2 rounded"
                  >
                    -
                  </button>
                  <span className="text-gray-900">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)} 
                    className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-1 px-2 rounded"
                  >
                    +
                  </button>
                  <button 
                    onClick={() => removeFromCart(item.id)} 
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      
      {/* Display the total price */}
      <h2 className="text-2xl font-bold mt-6 text-white">Total Price: ${totalPrice.toFixed(2)}</h2>
      
        {/* Button container for spacing */}
        <div className="flex space-x-4 mt-4">
          {/* Purchase button */}
          <button 
            onClick={() => navigate('/checkout')} 
            className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
          >
            Purchase
          </button>

          {/* Back to Product Selection button */}
          <button 
            onClick={() => navigate('/')} 
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Continue Shopping
          </button>
        </div>
    </div>
  );
};

export default ShoppingCart;
