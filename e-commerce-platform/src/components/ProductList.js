import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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

// ProductList component to display a list of products
const ProductList = () => {
  const [products, setProducts] = useState([]);

  // Fetch products from the local JSON file when the component mounts
  useEffect(() => {
    setProducts(productData);
  }, []);

  return (
    <div className="container mx-auto px-4">
      {/* Banner for Product List Header */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-6 rounded-lg shadow-lg mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">Thrive Loom E-Commerce</h1>
        <p className="text-lg">Discover our exclusive range of products. Quality and satisfaction guaranteed.</p>
        <div className="border-t-2 border-white w-24 mx-auto mt-4"></div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <Link to={`/product/${product.id}`} key={product.id} className="block">
            <div className="card transform transition duration-300 hover:scale-105 hover:shadow-2xl h-full flex flex-col justify-between">
              {/* Product image */}
              <img src={images[product.imageUrl]} alt={product.name} className="mb-4 w-full h-48 object-cover rounded" />
              <div className="p-4 flex flex-col flex-grow justify-between">
                {/* Product name */}
                <h2 className="text-xl font-semibold text-gray-900">{product.name}</h2>
                {/* Product description */}
                <p className="text-gray-600 mb-4 flex-grow">{product.description}</p>
                {/* Product price */}
                <p className="text-lg font-bold text-gray-900 mb-4">${product.price}</p>
                {/* Link to ProductDetail page */}
                <p className="text-purple-500 hover:text-yellow-300">View Details</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
