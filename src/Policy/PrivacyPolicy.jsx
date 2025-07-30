import React from 'react';
import Navbar from '../Home/Navbar';
import Footer from '../Home/Footer';

const PrivacyPolicy = () => {
  return (
    <>
    <Navbar/>
    <section className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <h1 className="mb-4 fw-bold text-center">Privacy Policy</h1>
          <p className="mb-4">
            At <strong>ElectroSupply</strong>, we value your privacy and are committed to protecting your personal information.
          </p>
          <p className="mb-4">
            This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website
            or make a purchase from our store.
          </p>
          <h5 className="fw-bold mb-2">Information We Collect</h5>
          <p className="mb-4">
            We may collect personal information such as your name, email address, shipping address, phone number,
            and payment details when you place an order or sign up for our services.
          </p>
          <h5 className="fw-bold mb-2">How We Use Your Information</h5>
          <p className="mb-4">
            We use your information to process orders, provide customer support, send updates about your orders,
            and inform you about promotions and new products if you have opted in.
          </p>
          <h5 className="fw-bold mb-2">Data Security</h5>
          <p className="mb-4">
            We implement industry-standard security measures to protect your data and ensure your personal information
            is handled securely.
          </p>
          <h5 className="fw-bold mb-2">Third-Party Services</h5>
          <p className="mb-4">
            We may use trusted third-party services to process payments or manage deliveries. These providers have
            access to your information only to perform tasks on our behalf.
          </p>
          <h5 className="fw-bold mb-2">Your Rights</h5>
          <p className="mb-4">
            You have the right to access, update, or delete your personal information at any time. Please contact us
            if you wish to exercise these rights.
          </p>
          <p className="mb-4">
            By using our website, you agree to this Privacy Policy. We may update this policy from time to time,
            so please review it periodically.
          </p>
          <a href="/contactus" className="btn custom-button rounded-pill px-4">
            Contact Us
          </a>
        </div>
      </div>
    </section>
    <Footer/>
    </>
  );
};

export default PrivacyPolicy;
