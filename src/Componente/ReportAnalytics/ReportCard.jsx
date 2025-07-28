import React, { useEffect, useState } from "react";
import axiosInstance from "../../Utilities/axiosInstance";
import Loader from "../../Loader/Loader";
import { Bar, Line } from "react-chartjs-2";
import {  Chart as ChartJS,  CategoryScale,  LinearScale,  BarElement,  LineElement,  PointElement,  Title,  Tooltip,  Legend,
} from "chart.js";

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const ReportCardWithGraphs = () => {
  const [statsData, setStatsData] = useState([]);
  const [barData, setBarData] = useState(null);
  const [lineData, setLineData] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axiosInstance.get(`/product/getAllInventoryProducts`);
        const data = response?.data?.data || [];

        const totalProducts = data.length;
        const inStock = data?.filter(p => Number(p.stockQuantity) > 15).length;
        const lowStock = data?.filter(p => Number(p.stockQuantity) <= 15 && Number(p.stockQuantity) > 0).length;
        const outOfStock = data?.filter(p => Number(p.stockQuantity) === 0).length;

        // Set card stats
        setStatsData([
          {
            title: "Total Products",
            value: totalProducts,
            change: "",
            icon: "bi-box-seam",
            color: "primary",
          },
          {
            title: "In Stock",
            value: inStock,
            change: "",
            icon: "bi-check2-circle",
            color: "success",
          },
          {
            title: "Low Stock",
            value: lowStock,
            change: "",
            icon: "bi-exclamation-triangle",
            color: "warning",
          },
          {
            title: "Out of Stock",
            value: outOfStock,
            change: "",
            icon: "bi-x-circle",
            color: "danger",
          },
        ]);

        // Bar Chart - stock distribution
        setBarData({
          labels: ["In Stock", "Low Stock", "Out of Stock"],
          datasets: [
            {
              label: "Product Status",
              data: [inStock, lowStock, outOfStock],
              backgroundColor: ["#198754", "#ffc107", "#dc3545"],
            },
          ],
        });

        // Line Chart - Dummy Average Process Time (replace later with real data)
        setLineData({
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [
            {
              label: "Avg. Processing Time (days)",
              data: [3, 5, 4, 6, 3, 4],
              borderColor: "#0d6efd",
              backgroundColor: "rgba(13, 110, 253, 0.2)",
              fill: true,
              tension: 0.4,
            },
          ],
        });

      } catch (error) {
        console.error("Error fetching inventory stats:", error);
      }
    };

    fetchStats();
  }, []);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
      },
    },
  };

  if (!statsData.length) return <Loader />;

  return (
    <div className="container-fluid">
      {/* Cards */}
      <div className="row mb-4">
        {statsData.map((stat, index) => (
          <div key={index} className="col-xl-3 col-md-6 mb-4">
            <div className={`card stat-card border-start-${stat.color} border-start-3`}>
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <div>
                    <h6 className="text-muted mb-1">{stat.title}</h6>
                    <h3 className="fw-bold mb-1">{stat.value}</h3>
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

      {/* Charts */}
      <div className="row g-4 mb-4">
        <div className="col-12 col-lg-6">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-white border-bottom-0">
              <h5 className="mb-0">Product Stock Distribution</h5>
            </div>
            <div className="card-body">
              <div style={{ height: "250px" }}>
                {barData && <Bar data={barData} options={chartOptions} />}
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-6">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-white border-bottom-0">
              <h5 className="mb-0">Average Processing Time</h5>
            </div>
            <div className="card-body">
              <div style={{ height: "250px" }}>
                {lineData && <Line data={lineData} options={chartOptions} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportCardWithGraphs;
