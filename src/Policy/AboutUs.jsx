import React from 'react';
import Navbar from '../Home/Navbar';
import Footer from '../Home/Footer';

const AboutUs = () => {
  return (
    <>
   <Navbar/>
    <section className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 text-center">
          <h1 className= "mb-4 fw-bold text-center">About Us</h1>
          <p className="lead text-muted mb-4">
            Welcome to <strong>ElectroSupply</strong> — your trusted online store for high-quality electrical supplies.
          </p>
          <p className="mb-4">
            We are committed to providing electricians, contractors, and DIY enthusiasts with top-notch products from
            the best brands in the industry. Whether you’re looking for wires, meters, tools, or electrical fixtures,
            we’ve got you covered with a wide range of reliable products.
          </p>
          <p className="mb-4">
            Our mission is to make shopping for electrical supplies easy, fast, and secure. We offer competitive prices,
            excellent customer service, and quick delivery to your doorstep.
          </p>
          <p className="mb-4">
            Thank you for choosing ElectroSupply. We look forward to powering your projects and building a brighter future together.
          </p>
          <a href="/contactus" className="btn btn-primary rounded-pill px-4">
            Contact Us
          </a>
        </div>
      </div>
    </section>
    <Footer/>
    </>
  );
};

export default AboutUs;
