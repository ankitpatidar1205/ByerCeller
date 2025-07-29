import React from 'react';
import Navbar from '../Home/Navbar';
import Footer from '../Home/Footer';

const RefundPolicy = () => {
  return (
    <>
    <Navbar/>
    <section className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <h1 className="mb-4 fw-bold text-center">Refund Policy</h1>
          <p className="mb-4">
            At <strong>ElectroSupply</strong>, we want you to be completely satisfied with your purchase.
            If you are not satisfied, please review our Refund Policy below.
          </p>

          <h5 className="fw-bold mb-2">Returns</h5>
          <p className="mb-4">
            You may return most new, unopened items within 30 days of delivery for a full refund.
            Items must be unused and in their original packaging.
          </p>

          <h5 className="fw-bold mb-2">Refunds</h5>
          <p className="mb-4">
            Once we receive your returned item, we will inspect it and notify you of the status of your refund.
            Approved refunds will be processed to your original payment method within 7–10 business days.
          </p>

          <h5 className="fw-bold mb-2">Non-Returnable Items</h5>
          <p className="mb-4">
            Some items are non-returnable, such as custom orders or clearance items. Please check the product page
            for specific return eligibility.
          </p>

          <h5 className="fw-bold mb-2">Shipping Costs</h5>
          <p className="mb-4">
            Return shipping costs are the responsibility of the customer unless the return is due to our error
            (e.g., wrong or defective item).
          </p>

          <h5 className="fw-bold mb-2">Contact Us</h5>
          <p className="mb-4">
            If you have any questions about your return or refund, please contact our support team. We are here
            to help!
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

export default RefundPolicy;
