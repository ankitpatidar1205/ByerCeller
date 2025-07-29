import React from "react";
import { useNavigate } from "react-router-dom";

// Mock forwarded orders
const forwardedOrders = [
  {
    order_id: "1",
    buyer_name: "KHALIL HISHAM ABDALLAH SHWAIKI",
    product_name: "Steel Zinc Platt Mounting",
    quantity: 20,
    total_price: 32000,
    seller_name: "Steel Zinc Platt Mounting",
    company: " HK KANDIVAN INTERNATIONAL TRADING COMPANY LIMITED ",
    status: "accepted",
  },
  
];

const SellerOrders = () => {

  const navigate = useNavigate();
  return (
    <div className="container py-4">
      <h4 className="fw-bold mb-3">Forwarded Orders</h4>

      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
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
            {forwardedOrders.map((order) => (
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellerOrders;
