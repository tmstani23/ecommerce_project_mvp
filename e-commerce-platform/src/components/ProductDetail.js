import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import productData from '../data/products.json';

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

// ProductDetail component to display detailed information about a single product
const ProductDetail = ({ addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);

  // Find the product that matches the ID
  const product = productData.find(p => p.id === parseInt(id));

  // If no product is found, display an error message
  if (!product) {
    return <p className="text-red-500 text-center mt-4">Product not found</p>;
  }

  // Function to handle adding to cart and showing notification
  const handleAddToCart = (product) => {
    addToCart(product);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000); // Hide notification after 3 seconds
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Notification */}
      {showNotification && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded shadow-lg">
          Item added to cart!
        </div>
      )}

      {/* Product name */}
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
        {/* Product image */}
        <img src={images[product.imageUrl]} alt={product.name} className="w-full lg:w-1/2 rounded mb-4 lg:mb-0" />

        <div className="flex-1">
          {/* Product description */}
          <p className="text-gray-700 mb-4">{product.description}</p>

          {/* Product price */}
          <p className="text-2xl font-bold mb-4">${product.price}</p>

          {/* Add to Cart button */}
          <button
            onClick={() => handleAddToCart(product)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
          >
            Add to Cart
          </button>

          {/* Navigation buttons */}
          <div className="flex space-x-4">
            <button
              onClick={() => navigate('/')}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Back to Products
            </button>
            <button
              onClick={() => navigate('/cart')}
              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            >
              Continue to Shopping Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
