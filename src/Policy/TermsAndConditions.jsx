import React from 'react';
import Navbar from '../Home/Navbar';
import Sidebar from '../layout/Sidebar';
import Footer from '../Home/Footer';


const TermsAndConditions = () => {
  return (
    <>
    <Navbar/>
    <section className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <h1 className="mb-4 fw-bold text-center">Terms & Conditions</h1>
          <p className="mb-4">
            Welcome to <strong>ElectroSupply</strong>. By accessing or using our website, you agree to comply with
            and be bound by these Terms & Conditions.
          </p>

          <h5 className="fw-bold mb-2">Use of Our Site</h5>
          <p className="mb-4">
            You agree to use our site for lawful purposes only. You must not use it in any way that violates applicable
            laws or regulations.
          </p>

          <h5 className="fw-bold mb-2">Product Information</h5>
          <p className="mb-4">
            We strive to ensure that all product descriptions, prices, and images are accurate. However, we reserve the
            right to correct any errors or inaccuracies at any time without prior notice.
          </p>

          <h5 className="fw-bold mb-2">Orders</h5>
          <p className="mb-4">
            All orders are subject to availability and confirmation. We reserve the right to cancel or refuse any order
            at our discretion.
          </p>

          <h5 className="fw-bold mb-2">Intellectual Property</h5>
          <p className="mb-4">
            All content on this site, including text, images, and logos, is the property of ElectroSupply and protected
            by copyright laws.
          </p>

          <h5 className="fw-bold mb-2">Limitation of Liability</h5>
          <p className="mb-4">
            ElectroSupply is not liable for any indirect or consequential losses or damages arising out of your use of
            this site.
          </p>

          <h5 className="fw-bold mb-2">Changes to Terms</h5>
          <p className="mb-4">
            We may update these Terms & Conditions at any time. Please review them regularly to stay informed.
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

export default TermsAndConditions;
