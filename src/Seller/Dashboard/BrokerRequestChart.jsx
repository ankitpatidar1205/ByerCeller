import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ['Pending', 'Connected', 'Declined'],
  datasets: [{
    label: 'Requests',
    data: [0, 0, 0],
    backgroundColor: ['#facc15', '#22c55e', '#ef4444']
  }]
};

const BrokerRequestChart = () => (
  <div className="card shadow-sm p-3 mb-4">
    <h5>Broker Requests <small className="text-muted float-end">Total: 8</small></h5>
    <Doughnut data={data} />
  </div>
);

export default BrokerRequestChart;
