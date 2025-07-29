import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Mock seller data
const mockSellers = [
  { seller_id: "1", name: "Ahmed Musa", company: "SpareParts LTD" },
  { seller_id: "2", name: "Zara Khouri", company: "AutoFix Middle East" },
  { seller_id: "3", name: "Mohamed Said", company: "Truck Solutions" },
];

// Mock order data  
const mockOrders = {
  "1": {
    order_id: "1",
    buyer_name: "Fadi Samarah",
    product_name: "Steel Zinc Platt Mounting",
    quantity: 20,
    price: 1600,
    status: "Received",
  },
  "1": {
    order_id: "2",
    buyer_name: "Omar Jalil",
    product_name: "Axle Spacer Ring",
    quantity: 10,
    price: 900,
    status: "Received",
  },
};

const ForwardToSeller = () => {
  const { id } = useParams(); // Order ID from route
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [sellers] = useState(mockSellers);
  const [selectedSellerId, setSelectedSellerId] = useState("");

  useEffect(() => {
    const orderData = mockOrders[id];
    if (orderData) {
      setOrder(orderData);
    } else {
      alert("Order not found");
      navigate("/broker/buyerorders");
    }
  }, [id, navigate]);

  const handleForward = () => {
    if (!selectedSellerId) {
      alert("Please select a seller to forward the order.");
      return;
    }

    const seller = sellers.find((s) => s.seller_id === selectedSellerId);
    alert(
      `Order forwarded to ${seller.name} (${seller.company}) for product: ${order.product_name}`
    );
    navigate("/orders/buyer");
  };

  if (!order) return <div className="p-4">Loading order...</div>;

  return (
    <div className="container py-4">
      <h4 className="fw-bold mb-3">Forward Order to Seller</h4>

      <div className="card p-3 mb-4">
        <h5 className="mb-2">Order Summary</h5>
        <p><strong>Buyer:</strong> {order.buyer_name}</p>
        <p><strong>Product:</strong> {order.product_name}</p>
        <p><strong>Quantity:</strong> {order.quantity}</p>
        <p><strong>Price per unit:</strong> ¥{order.price.toLocaleString()}</p>
        <p><strong>Total:</strong> ¥{(order.price * order.quantity).toLocaleString()}</p>
        <p><strong>Status:</strong> {order.status}</p>
      </div>

      <div className="mb-3">
        <label htmlFor="sellerSelect" className="form-label">Select Seller</label>
        <select
          className="form-select"
          id="sellerSelect"
          value={selectedSellerId}
          onChange={(e) => setSelectedSellerId(e.target.value)}
        >
          <option value="">-- Select Seller --</option>
          {sellers.map((seller) => (
            <option key={seller.seller_id} value={seller.seller_id}>
              {seller.name} - {seller.company}
            </option>
          ))}
        </select>
      </div>

      <button className="btn btn-primary" onClick={handleForward}>
        Forward Order
      </button>
    </div>
  );
};

export default ForwardToSeller;
