import React, { useState, useEffect } from "react";
import axios from "axios";
import axiosInstance from "../../Utilities/axiosInstance";

const AdminPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    price: "",
    billingCycle: "",
    features: "",
    description: "",
    status: "active",
  });

  // ✅ Fetch Plans
  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/plan/getAllPlans`);
      setPlans(res.data.data);
    } catch (error) {
      console.error("Error fetching plans:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Save or Update Plan
  const handleSavePlan = async (e) => {
    e.preventDefault();
    const planPayload = {
      name: formData.name,
      price: parseFloat(formData.price),
      billingCycle: formData.billingCycle,
      features: formData.features.split(",").map((f) => f.trim()),
      description: formData.description,
      status: formData.status,
    };

    try {
      if (formData.id) {
        await axiosInstance.patch(`/plan/updatePlan/${formData.id}`, planPayload);
      } else {
        await axiosInstance.post(`/plan/createPlan`, planPayload);
      }

      fetchPlans();
      setFormData({
        id: null,
        name: "",
        price: "",
        billingCycle: "",
        features: "",
        description: "",
        status: "active",
      });

      window.bootstrap.Modal.getInstance(
        document.getElementById("planModal")
      ).hide();
    } catch (error) {
      console.error("Error saving plan:", error);
    }
  };

  // ✅ Edit Plan
  const handleEdit = (plan) => {
    setFormData({
      id: plan.id,
      name: plan.name,
      price: plan.price,
      billingCycle: plan.billingCycle,
      features: plan.features.join(", "),
      description: plan.description,
      status: plan.status,
    });
    new window.bootstrap.Modal(
      document.getElementById("planModal")
    ).show();
  };

  // ✅ Delete Plan
  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete( `/plan/deletePlan/${id}`);
     await fetchPlans();
    } catch (error) {
      console.error("Error deleting plan:", error);
    }
  };

  return (
    <div className="container mt-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Manage Plans</h2>
        <button
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#planModal"
          onClick={() =>
            setFormData({
              id: null,
              name: "",
              price: "",
              billingCycle: "",
              features: "",
              description: "",
              status: "active", })}>
          + Create Plan
        </button>
      </div>

      {/* Loading / No Data */}
      {loading ? (
        <p>Loading plans...</p>
      ) : plans.length === 0 ? (
        <div className="alert alert-info text-center">
          🚫 No plans available. Please create one.
        </div>
      ) : (
        <div className="row">
          {plans.map((plan) => (
            <div key={plan.id} className="col-md-4 mb-4">
              <div className="card shadow-sm h-100">
                <div className="card-body text-center">
                  <h2 className="card-title fw-bold">{plan.name}</h2>
                  <h6 className="text-primary fw-bold fs-4">¥{plan.price}</h6>
                  <p className="text-muted small mb-2">
                    <strong>Plan Type:</strong> {plan.billingCycle}
                  </p>
                  <p className="text-muted small mb-2">{plan.description}</p>
                  <ul className="list-unstyled mt-3">
                    {plan.features.map((f, i) => (
                      <li key={i}>✅ {f.trim()}</li>
                    ))}
                  </ul>
                  <div className="d-flex justify-content-center gap-2 mt-3">
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => handleEdit(plan)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(plan.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
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
                {formData.id ? "Edit Plan" : "Create New Plan"}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <form onSubmit={handleSavePlan}>
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
                    type="number"
                    step="0.01"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Billing Cycle</label>
                  <input
                    type="text"
                    name="billingCycle"
                    value={formData.billingCycle}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="e.g. monthly, yearly"
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

                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="form-control"
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="form-select"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
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
                  {formData.id ? "Update Plan" : "Save Plan"}
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
