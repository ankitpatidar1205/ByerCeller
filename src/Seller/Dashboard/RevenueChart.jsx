import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
  datasets: [{
    label: 'Revenue',
    data: [1500, 2000, 3000, 4000, 1800, 2500, 3000, 4000, 7000, 11000],
    backgroundColor: 'rgba(54,162,235,0.1)',
    borderColor: '#36A2EB',
    tension: 0.4,
    fill: true
  }]
};

const options = {
  plugins: { legend: { display: true } },
  scales: {
    y: { beginAtZero: true }
  }
};

const RevenueChart = () => (
  <div className="card shadow-sm p-3 mb-4">
    <div className="d-flex justify-content-between">
      <h5>Revenue Over Time</h5>
      <span className="fw-semibold text-success">Total: $12,450</span>
    </div>
    <Line data={data} options={options} />
  </div>
);

export default RevenueChart;
