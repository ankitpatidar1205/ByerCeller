import React from 'react';
import StatCard from './StatCard';
import RecentRequestsTable from './RecentRequestsTable';
import DashboardCharts from './dashboardCharts';


const BrokerDashboard = () => {
  return (
    <div className="container-fluid p-4">
      <h2 className="fw-bold mb-2">Broker Dashboard</h2>
      <p className="text-muted">Welcome, HK Kandivan!</p>

      {/* Stat Cards */}
      <div className="row g-3 mb-4">
        <StatCard title="Buyers" value="1" icon="fa-users" color="primary" />
        <StatCard title="Sellers" value="1" icon="fa-store" color="success" />
        {/* <StatCard title="Total Sales" value="¥35200" icon="fa-dollar-sign" color="info" /> */}
        <StatCard title="Seller Requests" value="1" icon="fa-arrow-down" color="warning" />
        <StatCard title="Buyer Requests" value="1" icon="fa-arrow-up" color="danger" />
      </div>

      {/* Charts */}
      <DashboardCharts />

      {/* Request Table */}
      <RecentRequestsTable />
    </div>
  );
};

export default BrokerDashboard;
