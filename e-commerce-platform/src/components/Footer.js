import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-8">
      <div className="container mx-auto text-center">
        <p>© 2024 Thrive Loom E-Commerce Platform. All rights reserved.</p>
        <p>Created by Tim Stanislav as an MVP for demonstration purposes.</p>
        <p>Contact us: <a href="mailto:thriveloomhq@gmail.com" className="text-blue-400 hover:text-blue-600">thriveloomhq@gmail.com</a></p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="https://www.linkedin.com" className="text-blue-400 hover:text-blue-600">LinkedIn</a>
          <a href="https://twitter.com" className="text-blue-400 hover:text-blue-600">X (Twitter)</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
