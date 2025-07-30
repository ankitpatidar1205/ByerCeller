import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const data = [
  { status: "In Stock", count: 5 },
  { status: "Low Stock", count: 2 },
  { status: "Out of Stock", count: 1 },
];

const SellerInventoryChart = () => (
  <div className="card shadow-sm">
    <div className="card-header fw-semibold">Inventory Stock Overview</div>
    <div className="card-body">
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="status" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#28a745" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default SellerInventoryChart;
