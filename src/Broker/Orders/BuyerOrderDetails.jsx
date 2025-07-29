import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaCheck, FaTimes, FaPrint, FaDownload, FaPen, FaPaperPlane } from "react-icons/fa";

const BuyerOrderDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Static mock data for now
  const order = {
    orderId: id,
    createdAt: "2025-07-27",
    status: "Processing", // or "Completed", "Received"
    buyer: {
      name: "Fadi Samarah",
      company: "BASAMCO Company Limited",
      phone: "00972598361988",
      category: "Trucks spare parts",
      address: "48 Al Ram, City Ramallah, Jerusalem, Palestine 🇵🇸",
    },
    product: {
      name: "Steel Zinc Platt Mounting",
      code: "25005",
      quantity: 20,
      price: 1600,
      currency: "¥",
    },
    notes: "This customer can see all the categorized parts of trucks.",
  };

  const totalPrice = order.product.quantity * order.product.price;

  return (
    <div className="container-fluid py-4 px-3 px-md-5 bg-light min-vh-100">
      {/* Back Button */}
      <button className="btn btn-light mb-3" onClick={() => navigate(-1)}>
        <FaArrowLeft className="me-2" /> Back to Orders
      </button>

      {/* Header */}
      <h3 className="fw-bold mb-4">Order #{order.orderId} Details</h3>
      <p className="text-muted">Created on {order.createdAt}</p>

      <div className="row gy-4">
        {/* Left Section */}
        <div className="col-lg-8">
          {/* Buyer Info */}
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h5 className="fw-bold mb-3">Buyer Information</h5>
              <p><strong>Buyer Name:</strong> {order.buyer.name}</p>
              <p><strong>Phone:</strong> {order.buyer.phone}</p>
              <p><strong>Company:</strong> {order.buyer.company}</p>
              <p><strong>Address:</strong> {order.buyer.address}</p>
              <p><strong>Category:</strong> {order.buyer.category}</p>
            </div>
          </div>

          {/* Product Info */}
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h5 className="fw-bold mb-3">Order Summary</h5>
              <p><strong>Product:</strong> {order.product.name}</p>
              <p><strong>Code:</strong> {order.product.code}</p>
              <p><strong>Quantity:</strong> {order.product.quantity}</p>
              <p><strong>Unit Price:</strong> {order.product.currency}{order.product.price.toLocaleString()}</p>
              <p><strong>Total Price:</strong> {order.product.currency}{totalPrice.toLocaleString()}</p>
            </div>
          </div>



          {/* Notes */}
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="fw-bold mb-3">Notes</h5>
              <p>{order.notes}</p>
            </div>
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="fw-bold mb-3">Actions</h5>
             <ul className="list-unstyled">
  <li className="mb-3">
    <button className="btn btn-outline-success w-100 d-flex align-items-center justify-content-center">
      <FaCheck className="me-2" />
      Confirm Order
    </button>
  </li>
  
  {/* <li className="mb-3">
    <button className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center">
      <FaPen className="me-2" />
      Update Order
    </button>
  </li> */}
  
<li className="mb-3">
 
    <button className="btn btn-outline-dark w-100 d-flex align-items-center justify-content-center" onClick={() => navigate(`/orders/forward/${order.orderId}`)}>
      <FaPaperPlane className="me-2" />
      Forward to Seller
    </button>
  
</li>

  
  {/* <li className="mb-3">
    <button className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center">
      <FaDownload className="me-2" />
      Download Invoice
    </button>
  </li>
  
  <li className="mb-3">
    <button className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center">
      <FaPrint className="me-2" />
      Print Order
    </button>
  </li> */}
  
  <li>
    <button className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center">
      <FaTimes className="me-2" />
      Cancel Order
    </button>
  </li>
</ul>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerOrderDetails;
