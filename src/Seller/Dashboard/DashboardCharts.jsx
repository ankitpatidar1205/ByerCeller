import React, { useEffect, useState } from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import axiosInstance from "../../Utilities/axiosInstance";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement,} from "chart.js";

// Register chart components
ChartJS.register( ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const DashboardCharts = () => {
  const [dashboardData, setDashboardData] = useState({
    totalUsers: { count: 0 },
    totalProducts: { count: 0 },
  });

  const [stockData, setStockData] = useState({
    total: 0,
    inStock: 0,
    lowStock: 0,
    outOfStock: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // Fetch dashboard overview
        const dashboardRes = await axiosInstance.get("/dashboardOverview/getDashboardOverview");
        const dashboard = dashboardRes?.data || {
          totalUsers: { count: 0 },
          totalProducts: { count: 0 },
        };
        setDashboardData(dashboard);

        // Fetch inventory product data
        const inventoryRes = await axiosInstance.get("/product/getAllInventoryProducts");
        const products = inventoryRes?.data?.data || [];

        const inStock = products.filter(p => Number(p?.stockQuantity || 0) > 15).length;
        const lowStock = products.filter(p => Number(p?.stockQuantity || 0) <= 15 && Number(p?.stockQuantity || 0) > 0).length;
        const outOfStock = products.filter(p => Number(p?.stockQuantity || 0) === 0).length;

        setStockData({
          total: products.length,
          inStock,
          lowStock,
          outOfStock,
        });

      } catch (error) {
        console.error("Dashboard Chart Fetch Error:", error);
        // Optional: Set fallback data or flags here
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  if (loading) return <div>Loading charts...</div>;

  // Bar chart for stock overview
  const stockOverviewChart = {
    labels: ["In Stock", "Low Stock", "Out of Stock"],
    datasets: [
      {
        label: "Stock Overview",
        data: [
          stockData.inStock || 0,
          stockData.lowStock || 0,
          stockData.outOfStock || 0,
        ],
        backgroundColor: ["#4CAF50", "#FFC107", "#F44336"],
        borderRadius: 5,
      },
    ],
  };

  const stockOverviewOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { precision: 0 },
      },
    },
  };

  // Doughnut chart for user vs product
  const userProductData = {
    labels: ["Users", "Products"],
    datasets: [
      {
        data: [
          dashboardData?.totalUsers?.count || 0,
          dashboardData?.totalProducts?.count || 0,
        ],
        backgroundColor: ["#36A2EB", "#FF6384"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="row mb-4">
      {/* Bar Chart: Stock Overview */}
      <div className="col-lg-6 mb-4">
        <div className="card h-100">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Inventory Stock Overview</h5>
            <span className="badge bg-secondary">Total: {stockData.total}</span>
          </div>
          <div className="card-body">
            <div style={{ height: "250px" }}>
              <Bar data={stockOverviewChart} options={stockOverviewOptions} />
            </div>
          </div>
        </div>
      </div>

      {/* Doughnut Chart: Users vs Products */}
      <div className="col-lg-6 mb-4">
        <div className="card h-100">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Users vs Products</h5>
          </div>
          <div className="card-body">
            <div style={{ height: "250px" }}>
              <Doughnut
                data={userProductData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  cutout: "70%",
                  plugins: {
                    legend: { position: "bottom" },
                  },
                }}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;