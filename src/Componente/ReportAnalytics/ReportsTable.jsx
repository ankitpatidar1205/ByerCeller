

import React, { useState } from 'react';
import { FaDownload, FaEye } from 'react-icons/fa';

const ReportsTable = () => {
  const [reportType, setReportType] = useState("order");

  const orderReports = [
    { id: 'ORD001', product: 'Smartphone', quantity: 10, total: '₹1,20,000', status: 'Delivered', date: '2025-07-20' },
    { id: 'ORD002', product: 'LED TV', quantity: 5, total: '₹75,000', status: 'Pending', date: '2025-07-19' },
  ];

  const productReports = [
    { id: 'PRD001', name: 'Microwave', stock: 25, price: '₹7,000', status: 'In Stock' },
    { id: 'PRD002', name: 'Bluetooth Speaker', stock: 0, price: '₹2,200', status: 'Out of Stock' },
  ];

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-white d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Reports</h5>
        <select
          className="form-select form-select-sm"
          style={{ width: '200px' }}
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
        >
          <option value="order">Order Reports</option>
          <option value="product">Product Reports</option>
        </select>
      </div>

      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-bordered align-middle text-center">
            <thead className="table-light">
              {reportType === 'order' ? (
                <tr>
                  <th>Order ID</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              ) : (
                <tr>
                  <th>Product ID</th>
                  <th>Name</th>
                  <th>Stock</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              )}
            </thead>
            <tbody>
              {reportType === 'order' ? (
                orderReports.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.product}</td>
                    <td>{order.quantity}</td>
                    <td>{order.total}</td>
                    <td>
                      <span className={`badge bg-${
                        order.status === 'Delivered' ? 'success' : 'warning'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td>{order.date}</td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary me-1"><FaEye /></button>
                      <button className="btn btn-sm btn-outline-success"><FaDownload /></button>
                    </td>
                  </tr>
                ))
              ) : (
                productReports.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.stock}</td>
                    <td>{product.price}</td>
                    <td>
                      <span className={`badge bg-${
                        product.status === 'In Stock' ? 'success' : 'danger'
                      }`}>
                        {product.status}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary me-1"><FaEye /></button>
                      <button className="btn btn-sm btn-outline-success"><FaDownload /></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportsTable;
