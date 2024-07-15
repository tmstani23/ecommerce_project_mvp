import React, { useState, useEffect } from 'react';
import productData from '../data/products.json'; // Direct import of JSON data

// ProductList component to display a list of products
const ProductList = () => {
  const [products, setProducts] = useState([]);

  // Load products from the imported JSON data
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
