import { useState } from "react";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Dummy Orders Data
  const orders = [
    {
      id: "ORD1001",
      product: "iPhone 14 Pro Max 256GB",
      date: "2025-07-20",
      status: "Delivered",
      price: "$1,299",
      address: "48 Al Ram, Ramallah, Palestine",
    },
    {
      id: "ORD1002",
      product: "Samsung Galaxy S24 Ultra",
      date: "2025-07-22",
      status: "Shipped",
      price: "¥1,199",
      address: "Shenzhen, China",
    },
    {
      id: "ORD1003",
      product: "MacBook Pro 16-inch M3",
      date: "2025-07-25",
      status: "Pending",
      price: "$2,499",
      address: "New York, USA",
    },
  ];

  return (
    <>
      <div className="card shadow-sm rounded">
        <div className="card-body">
          <h4 className="mb-3 fw-bold">My Orders</h4>
          {orders.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Order ID</th>
                    <th>Product</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.product}</td>
                      <td>{order.date}</td>
                      <td>
                        <span
                          className={`badge ${
                            order.status === "Delivered"
                              ? "bg-success"
                              : order.status === "Shipped"
                              ? "bg-info"
                              : "bg-warning text-dark"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td>{order.price}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-primary"
                          data-bs-toggle="modal"
                          data-bs-target="#orderDetailModal"
                          onClick={() => setSelectedOrder(order)}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-4">
              <h5 className="mt-3">You haven't placed any orders yet!</h5>
              <p className="text-muted">
                Order section is empty. After placing order, you can track them
                from here.
              </p>
              <Link to="/electricalproducts" className="btn btn-primary">
                Continue Shopping
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Modal for Order Details */}
      <div
        className="modal fade"
        id="orderDetailModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            {selectedOrder && (
              <>
                <div className="modal-header">
                  <h5 className="modal-title">Order Details</h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <p>
                    <strong>Order ID:</strong> {selectedOrder.id}
                  </p>
                  <p>
                    <strong>Product:</strong> {selectedOrder.product}
                  </p>
                  <p>
                    <strong>Date:</strong> {selectedOrder.date}
                  </p>
                  <p>
                    <strong>Status:</strong> {selectedOrder.status}
                  </p>
                  <p>
                    <strong>Price:</strong> {selectedOrder.price}
                  </p>
                  <p>
                    <strong>Shipping Address:</strong> {selectedOrder.address}
                  </p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyOrders;
