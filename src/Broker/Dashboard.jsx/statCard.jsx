import React from 'react';

const StatCard = ({ title, value, icon, color }) => (
  <div className="col-md-2 col-sm-6 mb-3">
    <div className={`card shadow-sm border-0 p-3 text-${color}`}>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h6 className="mb-1">{title}</h6>
          <h4 className="fw-bold">{value}</h4>
        </div>
        <div style={{ fontSize: '2rem' }}>
          <i className={`bi ${icon}`}></i>
        </div>
      </div>
    </div>
  </div>
);

export default StatCard;
