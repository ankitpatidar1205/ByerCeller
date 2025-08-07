import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPinterestP,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from 'react-icons/fa';
import logo from '../assets/image-removebg-preview.png'
const Footer = () => {
  return (
    <footer
      id="contact"
      className="text-white pt-10 pb-6"
      style={{ backgroundColor: '#1f2a40' }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div>
            <img
              src={logo}
              alt="ElectroSupply Logo"
              className="h-14 mb-3"
            />
            <p className="text-sm text-gray-300">
              Empowering buyers and sellers with smart CRM tools and industrial-grade electrical supplies.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="text-white hover:text-blue-400 transition">
                <FaFacebookF />
              </a>
              <a href="#" className="text-white hover:text-blue-400 transition">
                <FaTwitter />
              </a>
              <a href="#" className="text-white hover:text-blue-400 transition">
                <FaInstagram />
              </a>
              <a href="#" className="text-white hover:text-blue-400 transition">
                <FaPinterestP />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h6 className="text-lg font-semibold mb-3">Company</h6>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/" className="text-decoration-none text-gray-400">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/electricalproducts" className="text-decoration-none text-gray-400">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/aboutus" className="text-decoration-none text-gray-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contactus" className="text-decoration-none text-gray-400">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h6 className="text-lg font-semibold mb-3">Policies</h6>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/privacypolicy" className="text-decoration-none text-gray-400">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-decoration-none text-gray-400">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/refund" className="text-decoration-none text-gray-400">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */} 
          <div>
            <h6 className="text-lg font-semibold mb-3">Contact</h6>
            <div className="space-y-2 text-sm text-gray-300">
              <p className="flex items-start gap-2">
                <FaMapMarkerAlt className="text-red-500 mt-1" />
                101 CRM Tower, Tech Business Park, San Jose, CA 95112
              </p>
              <p className="flex items-center gap-2">
                <FaPhoneAlt className="text-red-500" />
                +1 (800) 987-6543
              </p>
              <p className="flex items-center gap-2">
                <FaEnvelope className="text-red-500" />
                support@IONE.com
              </p>
            </div>

            <h6 className="text-lg font-semibold mt-6 mb-2">We Accept</h6>
            <div className="flex gap-2">
              <img src="https://img.icons8.com/color/36/visa.png" alt="Visa" />
              <img src="https://img.icons8.com/color/36/mastercard.png" alt="Mastercard" />
              <img src="https://img.icons8.com/color/36/amex.png" alt="Amex" />
              <img src="https://img.icons8.com/color/36/paypal.png" alt="PayPal" />
            </div>
          </div>
        </div>

        <hr className="border-gray-700 my-6" />

        <p className="text-center text-sm text-gray-500">
          © 2025 IONE. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
