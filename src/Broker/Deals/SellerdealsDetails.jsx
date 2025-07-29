import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaPhoneAlt, FaBuilding, FaCalendarAlt, FaCheck } from "react-icons/fa";

const mockDeal = {
  id: 101,
  seller_name: "AutoWorld FZE",
  phone: "+971556678912",
  company: "AutoWorld FZE Dubai",
  request_date: "2025-07-26",
  status: "Sent",
  address: "Warehouse 5, Ras Al Khor, Dubai, UAE",
  notes: "Requested urgent shipping of parts.",
};

const SellerdealsDetails = () => {
  const navigate = useNavigate();
  // In real implementation: fetch data using deal ID from params
  const { dealId } = useParams(); // currently not used with mockDeal

  const getBadgeClass = (status) => {
    switch (status) {
      case "Sent":
        return "badge bg-primary";
      case "Pending":
        return "badge bg-warning text-dark";
      case "Approved":
        return "badge bg-info";
      case "Completed":
        return "badge bg-success";
      default:
        return "badge bg-secondary";
    }
  };

  return (
    <div className="container-fluid py-4 px-3 px-md-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h4 fw-bold mb-1">Broker Deal Details</h2>
          <p className="text-muted">Request ID: #{mockDeal.id}</p>
        </div>
        <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
          <FaArrowLeft className="me-2" />
          Back
        </button>
      </div>

      {/* Detail Card */}
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <h5 className="mb-3">Seller Information</h5>
          <div className="mb-3">
            <strong>Name:</strong> {mockDeal.seller_name}
          </div>
          <div className="mb-3">
            <FaPhoneAlt className="me-2 text-muted" />
            <strong>Phone:</strong> {mockDeal.phone}
          </div>
          <div className="mb-3">
            <FaBuilding className="me-2 text-muted" />
            <strong>Company:</strong> {mockDeal.company}
          </div>
          <div className="mb-3">
            <FaCalendarAlt className="me-2 text-muted" />
            <strong>Request Date:</strong> {mockDeal.request_date}
          </div>
          <div className="mb-3">
            <strong>Status:</strong>{" "}
            <span className={getBadgeClass(mockDeal.status)}>{mockDeal.status}</span>
          </div>
          <div className="mb-3">
            <strong>Address:</strong> {mockDeal.address}
          </div>
          <div className="mb-3">
            <strong>Notes:</strong> {mockDeal.notes}
          </div>

          <div className="mt-4">
            <button className="btn btn-success me-3">
              <FaCheck className="me-2" />
              Mark as Completed
            </button>
            <button className="btn btn-outline-primary">Contact Seller</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerdealsDetails;
