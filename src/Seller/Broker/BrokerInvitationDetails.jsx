import React from "react";
import { useNavigate } from "react-router-dom";

const brokerDetails = {
  company_name: "HK KANDIVAN INTERNATIONAL TRADING COMPANY LIMITED",
  contact_name: "KHALIL HISHAM ABDALLAH SHWAIKI",
  phone: "008613332800284",
  ione_code: "IONE008613332800284",
  address: "H A192/193, Shenzhen Huaqiang North Manah A Building, manha, Shenzhen city, Dongguan province, China 🇨🇳",
  category: "Trucks spare parts",
//   note: "This broker can see the updated categories when integrated with the seller and buyer",
  status: "Pending",
  role: "broker",
  products: [
    { name: "Clutch Plate", quantity: 50, price: 120 },
    { name: "Gearbox", quantity: 10, price: 850 },
    { name: "Engine Mount", quantity: 30, price: 60 },
  ],
};

const BrokerInvitationDetails = () => {
  const navigate = useNavigate();

  const totalAmount = brokerDetails.products.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  return (
    <div className="container my-4">
      <div className="card shadow-sm">
        <button className="btn btn-primary w-[1/10] me-2 mb-2" onClick={() => navigate(-1)}>back</button>
        <div className="card-body">
          <h3 className="fw-bold mb-3">{brokerDetails.company_name}</h3>

          <div className="row mb-4">
            <div className="col-md-6 mb-2">
              <strong>Contact Person:</strong> <br />
              {brokerDetails.contact_name}
            </div>
            <div className="col-md-6 mb-2">
              <strong>Phone :</strong> <br />
              {brokerDetails.phone} 
            </div>
            <div className="col-md-6 mb-2">
              <strong>Category:</strong> <br />
              {brokerDetails.category}
            </div>
            <div className="col-md-6 mb-2">
              <strong>Status:</strong> <br />
              <span className={`badge ${brokerDetails.status === "Accepted" ? "bg-success" : "bg-warning text-dark"}`}>
                {brokerDetails.status}
              </span>
            </div>
            <div className="col-12 mt-3">
              <strong>Address:</strong> <br />
              {brokerDetails.address}
            </div>
            <div className="col-12 mt-3">
              <strong>IONE Code:</strong> <br />
              {brokerDetails.ione_code}
            </div>
          </div>

          <hr />

          <h5 className="fw-bold mb-3">Requested Products</h5>
          <div className="table-responsive">
            <table className="table table-bordered align-middle text-nowrap">
              <thead className="table-light">
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price (USD)</th>
                  <th>Total (USD)</th>
                </tr>
              </thead>
              <tbody>
                {brokerDetails.products.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
                <tr className="fw-bold">
                  <td colSpan="3" className="text-end">
                    Grand Total
                  </td>
                  <td>${totalAmount.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="text-end mt-4">
            <button className="btn btn-success px-4">Accept Invitation</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrokerInvitationDetails;
