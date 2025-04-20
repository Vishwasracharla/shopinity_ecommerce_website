import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Online Shopping</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-gray-300">Men</Link></li>
              <li><Link to="/" className="hover:text-gray-300">Women</Link></li>
              <li><Link to="/" className="hover:text-gray-300">Kids</Link></li>
              <li><Link to="/" className="hover:text-gray-300">Home & Living</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Customer Policies</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-gray-300">Contact Us</Link></li>
              <li><Link to="/" className="hover:text-gray-300">FAQ</Link></li>
              <li><Link to="/" className="hover:text-gray-300">T&C</Link></li>
              <li><Link to="/" className="hover:text-gray-300">Terms Of Use</Link></li>
              <li><Link to="/" className="hover:text-gray-300">Track Orders</Link></li>
              <li><Link to="/" className="hover:text-gray-300">Shipping</Link></li>
              <li><Link to="/" className="hover:text-gray-300">Cancellation</Link></li>
              <li><Link to="/" className="hover:text-gray-300">Returns</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Connect with Us</h3>
            <div className="space-y-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 block">Facebook</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 block">Twitter</a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 block">YouTube</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 block">Instagram</a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Keep in Touch</h3>
            <div className="space-y-4">
              <p>Subscribe to our newsletter to get updates on our latest offers!</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter Email Address"
                  className="flex-1 p-2 text-gray-800 rounded-l focus:outline-none"
                />
                <button className="bg-primary px-4 py-2 rounded-r hover:bg-primary-dark">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p>&copy; {new Date().getFullYear()} Myntra Clone. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
