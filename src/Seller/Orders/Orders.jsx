import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import axiosInstance from "../../Utilities/axiosInstance";
import { FaEye, FaTrash } from "react-icons/fa";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch data on mount
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axiosInstance.get(`/stripe/getAllUserCartPaymentData`);
      if (res.data.success) {
        setOrders(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching orders", error);
    }
  };

  const handleView = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleDelete = async (paymentId) => {
    try {
      const res = await axiosInstance.delete(
        `/stripe/deletePaymentById/${paymentId}`
      );
      if (res.data.success) {
        alert("Order deleted successfully!");
        fetchOrders(); // Refresh order list
      } else {
        alert("Failed to delete order.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Something went wrong while deleting.");
    }
  };

  return (
    <div className="card p-4">
      <div className="d-flex justify-content-between mb-4">
        <h4 className="fw-bold">Orders</h4>
        {/* <input
          type="text"
          placeholder="Search orders..."
          className="form-control w-auto"
        /> */}
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
                  <td>
                    {order.userInfo?.firstName} {order.userInfo?.lastName}
                  </td>
                  <td>{order.userInfo?.email}</td>
                  <td>${order.payments[0]?.amount}</td>
                  <td>
                    <span
                      className={`badge ${
                        order.payments[0]?.status === "success"
                          ? "bg-success"
                          : "bg-warning text-dark"
                      }`}
                    >
                      {order.payments[0]?.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-secondary me-2"
                      onClick={() => handleView(order)}
                    >
                     <FaEye size={14} />
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(order.payments[0]?.id)}
                    >
                     <FaTrash size={14} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for View */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <>
              <p>
                <strong>Name:</strong>{" "}
                {selectedOrder.userInfo?.firstName}{" "}
                {selectedOrder.userInfo?.lastName}
              </p>
              <p>
                <strong>Email:</strong> {selectedOrder.userInfo?.email}
              </p>

              <h6 className="mb-2 mt-2 fw-bold"> Order  Information:</h6>
              <table className="table table-sm table-bordered">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.cart.map((item, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{item.productName || "N/A"}</td>
                      <td>{item.quantity}</td>
                      <td>${item.price}</td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan="3" className="text-end fw-bold">
                      Total:
                    </td>
                    <td className="fw-bold">
                      ${selectedOrder.payments[0]?.amount}
                    </td>
                  </tr>
                </tbody>
              </table>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Orders;
