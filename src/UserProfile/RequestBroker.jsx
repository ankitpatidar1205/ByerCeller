import { useState } from "react";

const RequestBroker = () => {
  const [formData, setFormData] = useState({
    broker: "",
    productName: "",
    quantity: "",
    budget: "",
    notes: "",
  });

  // Dummy broker list
  const brokers = [
    { id: "BR001", name: "Ahmed Trading Broker" },
    { id: "BR002", name: "Global Parts Broker" },
    { id: "BR003", name: "Yongjia Broker Services" },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.broker) {
      alert("Please select a broker before submitting!");
      return;
    }
    alert(`Your request has been submitted to ${formData.broker}!`);
    console.log("Request Broker Form Data:", formData);
    // API call yahan add hoga
  };

  return (
    <div className="container my-4">
      <div className="card shadow-sm rounded">
        <div className="card-body">
          <h3 className="fw-bold mb-4">Request Broker</h3>
          <p className="text-muted">
            Select a broker and fill in the details. The broker will connect you with the right sellers.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Select Broker</label>
              <select
                name="broker"
                value={formData.broker}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">-- Choose a Broker --</option>
                {brokers.map((b) => (
                  <option key={b.id} value={b.name}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Product Name</label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter product name"
                required
              />
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter quantity"
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Budget (Optional)</label>
                <input
                  type="text"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="e.g. $500 - $1000"
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Additional Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="form-control"
                rows="4"
                placeholder="Describe your requirements..."
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary">
              Submit Request
            </button>
          </form>
        </div>
      </div>

      {/* Past Requests Section */}
      <div className="card shadow-sm rounded mt-4">
        <div className="card-body">
          <h5 className="fw-bold mb-3">My Past Requests</h5>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-light">
                <tr>
                  <th>Request ID</th>
                  <th>Broker</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>REQ101</td>
                  <td>Ahmed Trading Broker</td>
                  <td>Truck Engine Part</td>
                  <td>50</td>
                  <td><span className="badge bg-info">In Progress</span></td>
                  <td>2025-07-26</td>
                </tr>
                <tr>
                  <td>REQ100</td>
                  <td>Global Parts Broker</td>
                  <td>iPhone 14 Pro Max</td>
                  <td>20</td>
                  <td><span className="badge bg-success">Completed</span></td>
                  <td>2025-07-22</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestBroker;
