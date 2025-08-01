import React from "react";
import { useNavigate } from "react-router-dom";

// Mock forwarded orders
const forwardedOrders = [
  
  
];

const SellerOrders = () => {

  const navigate = useNavigate();
  return (
    <div className="container py-4">
      <h4 className="fw-bold mb-3">Orders</h4>

      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead >
            <tr>
              <th>Order ID</th>
              <th>Broker Name</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Company</th>
              <th>Status</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            { forwardedOrders.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center">No forwarded orders found.</td>
              </tr>
            ) : (
            forwardedOrders.map((order) => (
              
              <tr key={order.order_id}>
                <td>{order.order_id}</td>
                <td>{order.buyer_name}</td>
                <td>{order.product_name}</td>
                <td>{order.quantity}</td>
                <td>¥{order.total_price.toLocaleString()}</td>
                <td> {order.company}</td>
                <td>
                  <span className="badge bg-info">{order.status}</span>
                </td>
                <td>
                  
                  <button className="custom-button" onClick={() => navigate(`/orders/forwardeddetails/${order.order_id}`)} >
                    View
                  </button>
                </td>
              </tr>
           ) ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellerOrders;
