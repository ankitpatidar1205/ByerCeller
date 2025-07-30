import React from 'react';

const StatCard = ({ title, value, iconClass, color, subtitle }) => (
  <div className="col-md-3 mb-3">
    <div className="card shadow-sm p-3 h-100">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h6 className="text-muted mb-1">{title}</h6>
          <h4 className="fw-bold mb-1">{value}</h4>
          <small className={`text-${color}`}>{subtitle}</small>
        </div>
        <div className={`bg-${color} text-white p-3 rounded`}>
          <i className={iconClass}></i>
        </div>
      </div>
    </div>
  </div>
);

export default StatCard;
