import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const mockData = {
  // id: 201,
  //  buyer_name: "Fadi samarah",
  //   company: "BASAMCO company limited ",
  // phone: "001234567890",
  // category: "Trucks spare parts",
  // status: "Pending",
  // product: {
  //   name: "Steel Zinc Platt Mounting",
  //   code: "25005",
  //   quantity: 20,
  //   price: "¥1,760.00",
  // },
};

const BuyerRequestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // In real scenario, fetch by ID
  const deal = mockData;

  return (
    <div className="container-fluid py-4 px-3 px-md-4">
      <button className=" d-flex btn btn-light mb-3" onClick={() => navigate(-1)}>
        <FaArrowLeft className="me-2" />
        Back to Deals
      </button>

      <div className="card shadow-sm border-0">
        <div className="card-body">
          <h4 className="fw-bold mb-3">Buyer Request Details</h4>

          <div className="row mb-3">
            <div className="col-md-6">
              <strong>Buyer Name:</strong> {deal.buyer_name}
            </div>
            <div className="col-md-6">
              <strong>Company:</strong> {deal.company}
            </div>
            <div className="col-md-6 mt-3">
              <strong>Phone:</strong> {deal.phone}
            </div>
            <div className="col-md-6 mt-3">
              <strong>Category:</strong> {deal.category}
            </div>
            <div className="col-md-6 mt-3">
              <strong>Status:</strong>{" "}
              <span className="badge bg-warning text-dark">{deal.status}</span>
            </div>
          </div>

          <h5 className="mt-4">Requested Product</h5>
          <ul className="list-group">
            <li className="list-group-item">
              <strong>Product Name:</strong> {deal.product.name}
            </li>
            <li className="list-group-item">
              <strong>Code:</strong> {deal.product.code}
            </li>
            <li className="list-group-item">
              <strong>Quantity:</strong> {deal.product.quantity}
            </li>
            <li className="list-group-item">
              <strong>Price:</strong> {deal.product.price}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BuyerRequestDetails;
