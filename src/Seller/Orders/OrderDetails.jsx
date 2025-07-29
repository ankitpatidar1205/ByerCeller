import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaCheck, FaTimes, FaPrint, FaDownload, FaPen, FaPaperPlane } from "react-icons/fa";

const OrderDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Static mock data for now
  const order = {
    orderId: id,
    createdAt: "2025-07-27",
    status: "Processing", // or "Completed", "Received"
    buyer: {
      name: ": KHALIL HISHAM ABDALLAH SHWAIKI",
      company: "HK KANDIVAN INTERNATIONAL TRADING COMPANY LIMITED ",
      phone: "008613332800284",
      category: "Trucks spare parts",
      address: ":  H A192/193 ,Shenzhen Huaqiang North Manah A Building, manha, Shenzhen city , Dongguan province , China ",
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
        <div className="col-lg-12">
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
      
        
      </div>
    </div>
  );
};

export default OrderDetails;
