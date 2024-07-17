import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa'; // Import cart icon from react-icons
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import ShoppingCart from './components/ShoppingCart';
import Checkout from './components/Checkout';
import Footer from './components/Footer';
import products from './data/products.json'; // Import product data
import './styles/global.css'; // Import Tailwind CSS

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
      <div className="App flex flex-col min-h-screen">
        {/* Homepage navigation */}
        <nav className="bg-white shadow p-4 mb-4">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <NavLink to="/" className="text-blue-500 hover:text-blue-700 font-bold text-xl">
                Thrive Loom
              </NavLink>
              <NavLink to="/checkout" className="text-blue-500 hover:text-blue-700" activeClassName="font-bold">
                Checkout
              </NavLink>
            </div>
            <NavLink to="/cart" className="text-blue-500 hover:text-blue-700 relative">
              <FaShoppingCart size={24} />
              {cart.reduce((acc, item) => acc + item.quantity, 0) > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
                  {cart.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </NavLink>
          </div>
        </nav>

        {/* Main content */}
        <div className="flex-grow">
          <Routes>
            {/* Route for the product list page */}
            <Route path="/" element={<ProductList addToCart={addToCart} />} />
            {/* Route for the product detail page */}
            <Route path="/product/:id" element={<ProductDetail products={products} addToCart={addToCart} />} />
            {/* Route for the shopping cart page */}
            <Route path="/cart" element={<ShoppingCart cart={cart} setCart={setCart} />} />
            {/* Route for the checkout page */}
            <Route path="/checkout" element={<Checkout cart={cart} setCart={setCart} clearCart={clearCart} />} />
            {/* 404 Page */}
            <Route path="*" element={<div className="text-center text-2xl p-8">404: Page Not Found</div>} />
          </Routes>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
