import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from "recharts";

const barData = [
  { name: "Jan", sales: 0 },
  { name: "Feb", sales: 0 },
  { name: "Mar", sales: 0 },
  { name: "Apr", sales: 0 },
  { name: "May", sales: 0 },
  { name: "Jun", sales: 0 },
];

const pieData = [
  { name: "Buyers", value: 1 },
  { name: "Sellers", value: 1 },
];

const COLORS = ["#007bff", "#28a745"];

const DashboardCharts = () => {
  return (
    <div className="row mt-4">
      {/* Bar Chart */}
      <div className="col-md-8 mb-4">
        <div className="card h-100 shadow-sm">
          <div className="card-header fw-semibold">Monthly Sales Overview</div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#007bff" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="col-md-4 mb-4">
        <div className="card h-100 shadow-sm">
          <div className="card-header fw-semibold">User Distribution</div>
          <div className="card-body d-flex justify-content-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  label
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;
