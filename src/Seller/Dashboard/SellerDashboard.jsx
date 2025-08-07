import React, { useEffect, useState } from 'react';
import StatCard from './StatsPCards';
import RevenueChart from './RevenueChart';
import BrokerRequestChart from './BrokerRequestChart';
import axiosInstance from '../../Utilities/axiosInstance';

const SellerDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalProducts: 0,
    totalCategories: 0,
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    const sellerId = userData?.id;

    if (sellerId) {
      axiosInstance
        .get(`/dashboardOverview/getDashboardSeller/${sellerId}`)
        .then((res) => {
          if (res.data.status) {
            const { totalProducts, totalCategories } = res.data;
            setDashboardData({
              totalProducts: totalProducts.count,
              totalCategories: totalCategories.count,
            });
          }
        })
        .catch((err) => {
          console.error('Error fetching seller dashboard:', err);
        });
    }
  }, []);

  return (
    <div className="container-fluid p-4">
      <div className="row g-3 mb-4">
        <StatCard  title="Total Products"  value={dashboardData?.totalProducts}  iconClass="fas fa-box"  color="primary"/>
        <StatCard  title="Total Categories"  value={dashboardData?.totalCategories}  iconClass="fas fa-list"  color="info"/>
        <StatCard title="Orders" value="0" iconClass="fas fa-shopping-cart"  color="danger" />
        <StatCard  title="Users"  value="0"  iconClass="fas fa-users"  color="success"/>
      </div>

      <div className="row">
        <div className="col-md-8">
          <RevenueChart />
        </div>
        <div className="col-md-4">
          <BrokerRequestChart />
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
