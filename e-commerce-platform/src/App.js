import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import products from './data/products.json'; // Direct import of JSON data

// Main App component to handle routing
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route for the product list page */}
          <Route path="/" element={<ProductList />} />
          {/* Route for the product detail page */}
          <Route path="/product/:id" element={<ProductDetail products={products} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
