import React from "react";
import { Modal, Button } from "react-bootstrap";
import { FaEye, FaTrash } from "react-icons/fa";

const Orders = () => {
  const orders = []; // Static empty data for "No orders found" message
  const showModal = false; // Modal off by default

  return (
    <div className="card p-4">
      <div className="d-flex justify-content-between mb-4">
        <h4 className="fw-bold">Orders</h4>
      </div>

      <div className="table-responsive shadow-sm">
        <table className="table table-hover table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-3">
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>Sample Name</td>
                  <td>sample@email.com</td>
                  <td>$100.00</td>
                  <td>
                    <span className="badge bg-success">Success</span>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-outline-secondary me-2">
                      <FaEye size={14} />
                    </button>
                    <button className="btn btn-sm btn-danger">
                      <FaTrash size={14} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Empty Modal Placeholder */}
      <Modal show={showModal} onHide={() => {}} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Order details will appear here.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Orders;
