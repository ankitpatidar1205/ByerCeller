import React from "react";
import StatsCards from "./StatsCards";
import DashboardCharts from "./DashboardCharts";
import RecentOrders from "./RecentOrders";

const SellerDashboard = () => {
  return (
    <div className="container-fluid p-4">
      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h4 fw-bold mb-1">Dashboard Overview</h2>
          <p className="text-muted mb-0">Welcome back! </p>
        </div>
      
      </div>

      {/* Components */}
      <StatsCards />
      <DashboardCharts />
      <RecentOrders />
    </div>
  );
};

export default SellerDashboard;