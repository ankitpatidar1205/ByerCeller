import React, { useState } from "react";
import { FaUsers, FaStore, FaHandshake, FaBoxOpen } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const ReportsTable = () => {
  const [timeFrame, setTimeFrame] = useState("monthly");

  // Dummy stats
  const summary = [
    { title: "Total Buyers", count: 120, icon: <FaUsers />, color: "primary" },
    { title: "Total Sellers", count: 35, icon: <FaStore />, color: "success" },
    { title: "Total Brokers", count: 15, icon: <FaHandshake />, color: "warning" },
    { title: "Total Orders", count: 450, icon: <FaBoxOpen />, color: "danger" },
  ];

  // Dummy Bar Chart Data
  const salesData = [
    { name: "Jan", orders: 40, revenue: 4000 },
    { name: "Feb", orders: 30, revenue: 3200 },
    { name: "Mar", orders: 60, revenue: 6100 },
    { name: "Apr", orders: 45, revenue: 4300 },
    { name: "May", orders: 80, revenue: 7200 },
  ];

  // Dummy Pie Chart Data
  const roleDistribution = [
    { name: "Buyers", value: 120 },
    { name: "Sellers", value: 35 },
    { name: "Brokers", value: 15 },
  ];
  const COLORS = ["#0d6efd", "#198754", "#ffc107"];

  return (
    <div className="container my-4">
      <h3 className="fw-bold mb-4">Reports & Analytics</h3>

      {/* Time Filter */}
      <div className="mb-4">
        <label className="form-label fw-bold">Select Time Frame:</label>
        <select
          className="form-select w-auto d-inline-block ms-2"
          value={timeFrame}
          onChange={(e) => setTimeFrame(e.target.value)}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      {/* Summary Cards */}
      <div className="row g-4 mb-4">
        {summary.map((item, i) => (
          <div key={i} className="col-md-6 col-lg-3">
            <div className={`card shadow text-white bg-${item.color}`}>
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-1">{item.title}</h6>
                  <h3>{item.count}</h3>
                </div>
                <div className="fs-2">{item.icon}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="row g-4">
        {/* Orders & Revenue Bar Chart */}
        <div className="col-lg-8">
          <div className="card shadow border-0">
            <div className="card-body">
              <h5 className="fw-bold mb-3">Orders & Revenue Overview</h5>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="orders" fill="#0d6efd" name="Orders" />
                  <Bar dataKey="revenue" fill="#198754" name="Revenue ($)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Pie Chart for User Roles */}
        <div className="col-lg-4">
          <div className="card shadow border-0">
            <div className="card-body">
              <h5 className="fw-bold mb-3">User Role Distribution</h5>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={roleDistribution}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                  >
                    {roleDistribution.map((entry, index) => (
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
    </div>
  );
};

export default ReportsTable;
