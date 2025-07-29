import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaPhoneAlt,
  FaBuilding,
  FaCalendarAlt,
  FaCheck,
} from "react-icons/fa";

// Mock Data
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

// Mock Products
const mockProducts = [
  {
    id: 1,
    name: "Steel Zinc Platt Mounting",
    code: "25005",
    quantity: 20,
    basePrice: 1600,
    markup: 10,
  },
  {
    id: 2,
    name: "Brake Disc Plate",
    code: "25610",
    quantity: 10,
    basePrice: 2100,
    markup: 10,
  },
];

const SellerDealsDetails = () => {
  const navigate = useNavigate();
  const { dealId } = useParams();

  const [products, setProducts] = useState(mockProducts);

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

  const handleMarkupChange = (id, value) => {
    const updated = products.map((product) =>
      product.id === id
        ? { ...product, markup: parseFloat(value) || 10 }
        : product
    );
    setProducts(updated);
  };

  return (
    <div className="container-fluid py-4 px-3 px-md-5">
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

      {/* Seller Info Card */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <h5 className="mb-3">Seller Information</h5>
          <div className="mb-2"><strong>Name:</strong> {mockDeal.seller_name}</div>
          <div className="mb-2">
            {/* <FaPhoneAlt className="me-2 text-muted" /> */}
            <strong>Phone:</strong> {mockDeal.phone}
          </div>
          <div className="mb-2">
            {/* <FaBuilding className="me-2 text-muted" /> */}
            <strong>Company:</strong> {mockDeal.company}
          </div>
          <div className="mb-2">
            {/* <FaCalendarAlt className="me-2 text-muted" /> */}
            <strong>Request Date:</strong> {mockDeal.request_date}
          </div>
          <div className="mb-2">
            <strong>Status:</strong>{" "}
            <span className={getBadgeClass(mockDeal.status)}>{mockDeal.status}</span>
          </div>
          <div className="mb-2"><strong>Address:</strong> {mockDeal.address}</div>
          <div><strong>Notes:</strong> {mockDeal.notes}</div>

          <div className="mt-4">
            <button className="btn btn-success me-3">
              {/* <FaCheck className="me-2" /> */}
              Mark as Completed
            </button>
            <button className="btn btn-outline-primary">Contact Seller</button>
          </div>
        </div>
      </div>

      {/* Product List */}
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <h5 className="mb-3">Similar Product Listings</h5>
          <div className="table-responsive">
            <table className="table align-middle table-bordered">
              <thead className="table-light">
                <tr>
                  <th>Product Name</th>
                  <th>Code</th>
                  <th>Qty</th>
                  <th>Base Price</th>
                  <th>Markup (%)</th>
                  <th>Final Price</th>
                </tr>
              </thead>
              <tbody>
                {products.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.code}</td>
                    <td>{item.quantity}</td>
                    <td>¥{item.basePrice.toLocaleString()}</td>
                    <td style={{ width: "150px" }}>
                      <input
                        type="number"
                        className="form-control"
                        value={item.markup}
                        min="0"
                        max="100"
                        onChange={(e) =>
                          handleMarkupChange(item.id, e.target.value)
                        }
                      />
                    </td>
                    <td className="fw-bold text-success">
                      ¥
                      {(
                        item.basePrice +
                        (item.basePrice * item.markup) / 100
                      ).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDealsDetails;
