// BrokerReports.jsx
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const BrokerReports = () => {
  const barChartRef = useRef(null);
  const pieChartRef = useRef(null);

  useEffect(() => {
    const barCtx = barChartRef.current.getContext("2d");
    new Chart(barCtx, {
      type: "bar",
      data: {
        labels: ["Sellers", "Buyers", "Expenses", "Revenue", "Orders"],
        datasets: [
          {
            label: "Report Data",
            data: [45, 70, 2500, 4800, 95],
            backgroundColor: [
              "#4e73df",
              "#1cc88a",
              "#e74a3b",
              "#36b9cc",
              "#f6c23e"
            ]
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: { display: true, text: "Broker Report Overview" }
        }
      }
    });

    const pieCtx = pieChartRef.current.getContext("2d");
    new Chart(pieCtx, {
      type: "doughnut",
      data: {
        labels: ["Revenue", "Expenses"],
        datasets: [
          {
            data: [4800, 2500],
            backgroundColor: ["#1cc88a", "#e74a3b"],
            hoverOffset: 4
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: { display: true, text: "Revenue vs Expenses" },
          legend: { position: "bottom" }
        }
      }
    });
  }, []);

  return (
    <div className="container-fluid p-4">
      <h2 className="h4 fw-bold mb-4">Broker Reports</h2>

      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="bg-light rounded p-3 shadow-sm">
            <h6>Total Sellers Contacted</h6>
            <h4 className="fw-bold text-primary">45</h4>
          </div>
        </div>
        <div className="col-md-3">
          <div className="bg-light rounded p-3 shadow-sm">
            <h6>Total Buyers</h6>
            <h4 className="fw-bold text-success">70</h4>
          </div>
        </div>
        <div className="col-md-2">
          <div className="bg-light rounded p-3 shadow-sm">
            <h6>Expenses</h6>
            <h4 className="fw-bold text-danger">$2,500</h4>
          </div>
        </div>
        <div className="col-md-2">
          <div className="bg-light rounded p-3 shadow-sm">
            <h6>Incoming Revenue</h6>
            <h4 className="fw-bold text-info">$4,800</h4>
          </div>
        </div>
        <div className="col-md-2">
          <div className="bg-light rounded p-3 shadow-sm">
            <h6>Total Orders</h6>
            <h4 className="fw-bold text-warning">95</h4>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-md-8">
          <div className="bg-white p-3 rounded shadow-sm">
            <h6 className="mb-3">Report Summary - Bar Chart</h6>
            <canvas ref={barChartRef}></canvas>
          </div>
        </div>

        <div className="col-md-4">
          <div className="bg-white p-3 rounded shadow-sm">
            <h6 className="mb-3">Revenue vs Expenses - Doughnut</h6>
            <canvas ref={pieChartRef}></canvas>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrokerReports;
