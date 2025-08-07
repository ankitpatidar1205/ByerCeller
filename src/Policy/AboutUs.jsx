import React from 'react';
import Navbar from '../Home/Navbar';
import Footer from '../Home/Footer';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <>
      <Navbar/>
      <section className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <h1 className="mb-4 fw-bold text-center">About Us</h1>
            <p className="lead text-muted mb-4">
              Welcome to <strong>Ione CRM</strong> — your trusted platform for managing buyers and sellers efficiently.
            </p>
            <p className="mb-4">
              At Ione, we don’t sell products directly. Instead, we empower businesses and individuals with a 
              modern Buyer-Seller CRM system that simplifies communication, tracks interactions, and 
              builds stronger relationships. Our focus is on creating a smooth experience that helps 
              buyers and sellers connect in an organized and secure environment.
            </p>
            <p className="mb-4">
              Whether you are a seller managing multiple clients or a buyer coordinating with different 
              vendors, our CRM solution provides the tools you need — from lead tracking and secure messaging 
              to task management and performance insights. 
            </p>
            <p className="mb-4">
              Our mission is to bridge the gap between buyers and sellers with technology-driven solutions. 
              With Ione CRM, you can focus on growth while we handle the complexities of relationship management.
            </p>
            <Link to="/contactus" className="btn custom-button rounded-pill px-4">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
};

export default AboutUs;
