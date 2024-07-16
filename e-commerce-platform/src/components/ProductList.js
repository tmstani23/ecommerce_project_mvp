import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import productData from '../data/products.json'; // Import product data

// ProductList component to display a list of products
const ProductList = () => {
  const [products, setProducts] = useState([]);

  // Fetch products from the local JSON file when the component mounts
  useEffect(() => {
    setProducts(productData);
  }, []);

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <img src={product.imageUrl} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>${product.price}</p>
            {/* Link to ProductDetail page */}
            <Link to={`/product/${product.id}`}>View Details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
