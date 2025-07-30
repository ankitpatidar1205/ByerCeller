import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../Utilities/axiosInstance';
import Search from './Search';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [redirectPath, setRedirectPath] = useState("/login");
  const [cartCount, setCartCount] = useState(0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

//use useEffect to check if user is logged in and set redirect path
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = JSON.parse(localStorage.getItem("user"));
    if (token && userData?.role) {
      if (userData.role === "admin") {
        setRedirectPath("/admin/dashboard");
      } else if (userData.role === "user") {
        setRedirectPath("/profilepage");
      }
    } else {
      setRedirectPath("/login");
    }
  }, []);

  // Fetch cart count for the logged-in user
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;

    const fetchCartCount = async () => {
      if (!userId) return;
      try {
        const res = await axiosInstance.get(`/cart/getCartByUserId/${userId}`);
        const count = res.data?.data?.length || 0;
        setCartCount(count);
        localStorage.setItem("cartCount", count);
      } catch (err) {
        console.error("Cart fetch error", err);
      }
    };

  
    const interval = setInterval(() => {
      fetchCartCount();
    }, 2000);

    
    fetchCartCount();

    return () => clearInterval(interval); 
  }, []);

  return (
    <nav className=" shadow-md sticky top-0 z-50" style={{backgroundColor:"#1f2a40"}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo - Left Side */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img  src="https://i.postimg.cc/P5jK1nqQ/Whats-App-Image-2025-07-30-at-15-05-38-902587ee.jpg"  alt="logo"  className="h-14 " />
            </Link>
          </div>

          {/* Center Navigation - Desktop */}
          <div className="hidden md:flex items-center absolute left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-8">
              <Link to="/" className="text-light hover:text-blue-600 px-3 py-2 text-sm font-bold">Home</Link>
              <Link to="/electricalproducts" className="text-light hover:text-blue-600 px-3 py-2 text-sm font-bold">Products</Link>
              <Link to="/pricing" className="text-light hover:text-blue-600 px-3 py-2 text-sm font-bold">Pricing </Link>
              <Link to="/contactus" className="text-light hover:text-blue-600 px-3 py-2 text-sm font-bold">Contact Us</Link>
            </div>
          </div>

          {/* Right Side Icons - Desktop */}
          <div className="flex items-center space-x-4 ml-auto">
            <div className="hidden md:block relative mx-4">
              <Search/>
              <svg className="absolute right-3 top-2 h-4 w-4 text-white-400"   xmlns="http://www.w3.org/2000/svg" 
              fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <Link to="/shoppingcart" className="p-1 rounded-full text-light hover:text-blue-600 hover:bg-gray-100">
              <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"> {cartCount}</span>
              </div>
            </Link>
            <Link to={redirectPath} className="p-1 rounded-full text-light hover:text-blue-600 hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button  onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none"
                aria-expanded="false" >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
          <div className="px-3 py-2"><Search/> </div>
          <Link   to="/" 
          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
            onClick={toggleMenu} >
            Home </Link>
          <Link   to="/electricalproducts" 
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
          onClick={toggleMenu} >  Products </Link>
            <Link   to="/pricing" 
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
          onClick={toggleMenu} >  Pricing </Link>
          <Link   to="/contactus" 
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
           onClick={toggleMenu} >  Contact Us </Link>
          <div className="flex items-center justify-between px-3 py-2">
                  
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;