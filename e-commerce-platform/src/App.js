import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import ShoppingCart from './components/ShoppingCart';
import Checkout from './components/Checkout';
import products from './data/products.json';

// Main App component to handle routing and state management
function App() {
  const [cart, setCart] = useState([]);

  // Load cart data from local storage when the component mounts
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  // Save cart data to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Function to add a product to the cart
  const addToCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
      setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Function to clear the cart
  const clearCart = () => {
    setCart([]);
  };

  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/cart">Shopping Cart</Link>
            </li>
            <li>
              <Link to="/checkout">Checkout</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          {/* Route for the product list page */}
          <Route path="/" element={<ProductList />} />
          {/* Route for the product detail page */}
          <Route path="/product/:id" element={<ProductDetail products={products} addToCart={addToCart} />} />
          {/* Route for the shopping cart page */}
          <Route path="/cart" element={<ShoppingCart cart={cart} setCart={setCart} />} />
          {/* Route for the checkout page */}
          <Route path="/checkout" element={<Checkout cart={cart} clearCart={clearCart} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
