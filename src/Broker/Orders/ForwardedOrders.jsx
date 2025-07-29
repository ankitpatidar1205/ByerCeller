import React from "react";
import { useNavigate } from "react-router-dom";

// Mock forwarded orders
const forwardedOrders = [
  {
    order_id: "1",
    buyer_name: "Fadi Samarah",
    product_name: "Steel Zinc Platt Mounting",
    quantity: 20,
    total_price: 32000,
    seller_name: "Steel Zinc Platt Mounting",
    company: "YINGJIA MANUFACTURER TRUCKS PARTS COMPANY LIMITED",
    status: "Forwarded",
  },
  
];

const ForwardedOrders = () => {

  const navigate = useNavigate();
  return (
    <div className="container py-4">
      <h4 className="fw-bold mb-3">Forwarded Orders</h4>

      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Buyer</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Seller</th>
              <th>Status</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {forwardedOrders.map((order) => (
              <tr key={order.order_id}>
                <td>{order.order_id}</td>
                <td>{order.buyer_name}</td>
                <td>{order.product_name}</td>
                <td>{order.quantity}</td>
                <td>¥{order.total_price.toLocaleString()}</td>
                <td>{order.seller_name} ({order.company})</td>
                <td>
                  <span className="badge bg-info">{order.status}</span>
                </td>
                <td>
                  
                  <button className="btn-primary" onClick={() => navigate(`/orders/forwardeddetails/${order.order_id}`)} >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ForwardedOrders;
