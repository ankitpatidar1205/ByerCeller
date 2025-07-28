import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "../../Utilities/axiosInstance";
import Loader from "../../Loader/Loader";

const StatsCards = () => {
  const [statsData, setStatsData] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axiosInstance.get(`/dashboardOverview/getDashboardOverview`);
        const data = response.data;
           console.log(data)
        const formattedStats = [
          {
            title: "Total Products",
            value: data.totalProducts?.count || 0,
            change: `${data.totalProducts?.change || 0}% from last month`,
            icon: "bi-box-seam",
            color: "primary",
          },
          {
            title: "Total Orders",
            value: data.totalOrders?.count || 0,
            change: `${data.totalOrders?.change || 0}% from last month`,
            icon: "bi-cart-check",
            color: "danger",
          },
          {
            title: "Total Users",
            value: data.totalUsers?.count || 0,
            change: `${data.totalUsers?.change || 0}% from last month`,
            icon: "bi-people",
            color: "warning",
          },
          {
            title: "Total Revenue",
            value: `$${data.totalRevenue?.count || 0}`,
            change: `${data.totalRevenue?.change || 0}% from last month`,
            icon: "bi-currency-dollar",
            color: "success",
          },
        ];

        setStatsData(formattedStats);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };

    fetchStats();
  }, []);

  if (!statsData) {
    return <div><Loader/></div>;
  }

  return (
    <div className="row mb-4">
      {statsData.map((stat, index) => (
        <div key={index} className="col-xl-3 col-md-6 mb-4">
          <div className={`card stat-card border-start-${stat.color} border-start-3`}>
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h6 className="text-muted mb-1">{stat.title}</h6>
                  <h3 className="fw-bold mb-1">{stat.value}</h3>
                  <span className={`badge bg-${stat.color}-subtle text-${stat.color}`}>
                    <i className={`bi bi-arrow-up text-${stat.color}`}></i> {stat.change}
                  </span>
                </div>
                <div className={`bg-${stat.color}-subtle p-3 rounded`}>
                  <i className={`bi ${stat.icon} fs-4 text-${stat.color}`}></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
