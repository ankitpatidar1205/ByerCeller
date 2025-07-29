import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BuyerOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Mocked static data
    const mockOrders = [
      {
        order_id: 1,
        buyer_name: "BASAMCO Company Limited",
        product_name: "Steel Zinc Platt Mounting",
        product_code: "25005",
        quantity: 20,
        price: 1760.0,
        status: "Received", // or "Completed"
      },
      {
        order_id: 2,
        buyer_name: "BASAMCO Company Limited",
        product_name: "Steel Zinc Platt Mounting",
        product_code: "TRK3901",
        quantity: 10,
        price: 1200.0,
        status: "Completed",
      },
    ];

    // Simulate API delay
    setTimeout(() => setOrders(mockOrders), 300);
  }, []);

  return (
    <div className="container py-4">
      <h4 className="fw-bold mb-3">Buyer Orders</h4>

      <div className="table-responsive">
        <table className="table table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Buyer</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order.order_id}>
                <td>{index + 1}</td>
                <td>{order.buyer_name}</td>
                <td>{order.product_name}</td>
                <td>{order.quantity}</td>
                <td>¥{order.price.toLocaleString()}</td>
                <td>¥{(order.price * order.quantity).toLocaleString()}</td>
                <td>
                  <span
                    className={`badge bg-${
                      order.status === "Completed" ? "success" : "warning"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td>
                  <Link
                    to={`/orders/buyer/${order.order_id}`}
                    
                    className="btn btn-sm btn-primary"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center text-muted">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BuyerOrders;
