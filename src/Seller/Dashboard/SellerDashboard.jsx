import React from 'react';
// import StatCard from './StatCard';
import RevenueChart from './RevenueChart';
import BrokerRequestChart from './BrokerRequestChart';
// import BrokerRequestsTable from './BrokerRequestsTable';
import StatCard from './StatsPCards';


const SellerDashboard = () => {
  return (
    <div className="container-fluid p-4">
      <div className="row g-3 mb-4">
          <StatCard
        title="Total Products"
        value="0"
        // subtitle="↑ 100% from last month"
        iconClass="fas fa-box"
        color="primary"
      />
      <StatCard
        title="Active Deals"
        value="0"
        // subtitle="↑ 1 new deals"
        iconClass="fas fa-handshake"
        color="danger"
      />
      <StatCard
        title="Connected Brokers"
        value="0"
        // subtitle="↑1 more from last month"
        iconClass="fas fa-user-friends"
        color="warning"
      />
      <StatCard
        title="Total Revenue"
        value="0"
        // subtitle="↑ $3,200 from last month"
        iconClass="fas fa-dollar-sign"
        color="success"
      />
      </div>

      <div className="row">
        <div className="col-md-8">
          <RevenueChart />
        </div>
        <div className="col-md-4">
          <BrokerRequestChart />
        </div>
      </div>

      {/* <BrokerRequestsTable /> */}
    </div>
  );
};

export default SellerDashboard;
