import React, { useEffect, useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


// ... import statements remain unchanged

const mockDeals = [
  {
    id: 101,
    seller_name: "Al-Madina Auto Parts",
    company: "Al-Madina Trading Co.",
    phone: "009715511223344",
    category: "Trucks spare parts ",
    status: "Sent",
    product: {
      name: "Steel Zinc Platt Mounting",
      code: "25005",
      quantity: 20,
      price: "¥1,600.00",
    },
  },
  
];

const SellerRequest = () => {
  // ... state, useEffect, and handlers stay the same

   const [deals, setDeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setDeals(mockDeals); // Replace with API call if needed
  }, []);

  const filteredDeals = deals.filter((deal) =>
    deal.seller_name.toLowerCase().includes(searchTerm.toLowerCase().trim())
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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h4 fw-bold mb-1">Seller Deals</h2>
          <p className="text-muted">Track your seller requests & status</p>
        </div>
      </div>

      {/* Search */}
      {/* ... Search input remains unchanged */}

      {/* Deals Table */}
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <h5 className="card-title mb-3">Seller Requests</h5>
          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle text-nowrap mb-0">
              <thead className="table-light">
                <tr>
                  <th>Deal ID</th>
                  <th>Seller</th>
                  <th>Company</th>
                  <th>Phone</th>
                  <th>Category</th>
                  <th>Product Name</th>
                  <th>Code</th>
                  <th>Qty</th>
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
                      <td>{deal.seller_name}</td>
                      <td>{deal.company}</td>
                      <td>{deal.phone}</td>
                      <td>{deal.category}</td>
                      <td>{deal.product.name}</td>
                      <td>{deal.product.code}</td>
                      <td>{deal.product.quantity}</td>
                      <td>{deal.product.price}</td>
                      <td>{getStatusBadge(deal.status)}</td>
                      <td className="text-end">
                        <i
                          className="fa fa-eye me-2 text-primary"
                          style={{ cursor: "pointer" }}
                          onClick={() => navigate(`/broker/deal-details/${deal.id}`)}
                        ></i>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="11" className="text-center py-5">
                      <FaSearch size={48} className="text-muted mb-3" />
                      <h5 className="fw-semibold">No deals found</h5>
                      <p className="text-muted">Try adjusting your search</p>
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

export default SellerRequest;


