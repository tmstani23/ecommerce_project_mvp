import React from 'react';
import { useParams } from 'react-router-dom';

// ProductDetail component to display detailed information about a single product
const ProductDetail = ({ products, addToCart }) => {
  // Get the product ID from the URL parameters
  const { id } = useParams();
  
  // Find the product that matches the ID
  const product = products.find(p => p.id === parseInt(id));

  // If no product is found, display an error message
  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.imageUrl} alt={product.name} />
      <p>{product.description}</p>
      <p>${product.price}</p>
      {/* Add to Cart button */}
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
};

export default ProductDetail;
