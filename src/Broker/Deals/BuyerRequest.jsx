import React, { useEffect, useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const mockBuyerDeals = [
  {
    id: 201,
    buyer_name: "Universal Auto Buyers",
    company: "Universal Imports LLC",
    phone: "001234567890",
    category: "Braking System",
    status: "Pending",
    product: {
      name: "Steel Zinc Platt Mounting",
      code: "25005",
      quantity: 20,
      price: "¥1,600.00",
    },
  },
  {
    id: 202,
    buyer_name: "Nova Car Supplies",
    company: "Nova Autotech Co.",
    phone: "0091987654321",
    category: "Body Panels",
    status: "Sent",
    product: {
      name: "Front Fender LH",
      code: "35577",
      quantity: 10,
      price: "¥2,200.00",
    },
  },
];

const BuyerRequest = () => {
  const [deals, setDeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setDeals(mockBuyerDeals);
  }, []);

  const filteredDeals = deals.filter((deal) =>
    deal.buyer_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case "Sent":
        return <span className="badge bg-info text-dark">{status}</span>;
      case "Pending":
        return <span className="badge bg-warning text-dark">{status}</span>;
      case "Approved":
        return <span className="badge bg-primary">{status}</span>;
      case "Completed":
        return <span className="badge bg-success">{status}</span>;
      default:
        return <span className="badge bg-secondary">{status}</span>;
    }
  };

  return (
    <div className="container-fluid py-4 px-3 px-md-4">
      <h2 className="h4 fw-bold mb-1">Buyer Deals</h2>
      <p className="text-muted">Manage buyer product requests & quotations</p>

      {/* Search */}
      <div className="card mb-4 border-0 shadow-sm">
        <div className="card-body p-3">
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0">
              <FaSearch className="text-muted" />
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Search by buyer name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => setSearchTerm("")}
              >
                <FaTimes />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Deal ID</th>
                  <th>Buyer</th>
                  <th>Company</th>
                  <th>Phone</th>
                  <th>Category</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDeals.length > 0 ? (
                  filteredDeals.map((deal) => (
                    <tr key={deal.id}>
                      <td>{deal.id}</td>
                      <td>{deal.buyer_name}</td>
                      <td>{deal.company}</td>
                      <td>{deal.phone}</td>
                      <td>{deal.category}</td>
                      <td>{deal.product.name} ({deal.product.code})</td>
                      <td>{deal.product.quantity}</td>
                      <td>{deal.product.price}</td>
                      <td>{getStatusBadge(deal.status)}</td>
                      <td className="text-end">
                        <i
                          className="fa fa-eye text-primary"
                          style={{ cursor: "pointer" }}
                          onClick={() => navigate(`/broker/buyer-request-details/${deal.id}`)}
                        ></i>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className="text-center py-5">
                      <FaSearch size={48} className="text-muted mb-3" />
                      <h5>No buyer deals found</h5>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerRequest;
