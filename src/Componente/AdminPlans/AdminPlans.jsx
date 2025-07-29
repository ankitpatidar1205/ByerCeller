import React, { useState } from "react";

const AdminPlans = () => {
const [plans, setPlans] = useState([
  { 
    name: "Basic", 
    price: "$5", 
    features: [
      "20 Products", 
      "Basic CRM", 
      "Email Support", 
      "1 GB File Storage"
    ] 
  },
  { 
    name: "Standard", 
    price: "$10", 
    features: [
      "100 Products", 
      "Reports & Analytics", 
      "Priority Email Support", 
      "5 GB File Storage", 
      "Order Tracking"
    ] 
  },
  { 
    name: "Pro", 
    price: "$20", 
    features: [
      "Unlimited Products", 
      "Advanced Reports", 
      "24/7 Support", 
      "20 GB File Storage", 
      "Bulk Messaging", 
      "Custom Branding"
    ] 
  },
]);


  const [formData, setFormData] = useState({
    name: "",
    price: "",
    features: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreatePlan = (e) => {
    e.preventDefault();
    const newPlan = {
      name: formData.name,
      price: formData.price,
      features: formData.features.split(","),
    };
    setPlans([...plans, newPlan]);
    setFormData({ name: "", price: "", features: "" }); // reset form
    window.bootstrap.Modal.getInstance(document.getElementById("planModal")).hide(); // close modal
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Manage Plans</h2>
        <button
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#planModal"
        >
          + Create Plan
        </button>
      </div>

      {/* Plan Cards */}
      <div className="row">
        {plans.map((plan, idx) => (
          <div key={idx} className="col-md-4 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-body text-center">
                <h5 className="card-title fw-bold">{plan.name}</h5>
                <h6 className="text-primary fs-4">{plan.price}</h6>
                <ul className="list-unstyled mt-3">
                  {plan.features.map((f, i) => (
                    <li key={i}>✅ {f}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bootstrap Modal */}
      <div
        className="modal fade"
        id="planModal"
        tabIndex="-1"
        aria-labelledby="planModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fw-bold" id="planModalLabel">
                Create New Plan
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <form onSubmit={handleCreatePlan}>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Plan Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Price</label>
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Features (comma separated)</label>
                  <textarea
                    name="features"
                    value={formData.features}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  ></textarea>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPlans;
