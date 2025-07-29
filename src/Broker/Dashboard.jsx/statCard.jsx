import React from "react";

const StatCard = ({ title, value, icon, color = "primary" }) => {
  return (
    <div className="col-md-4 col-lg-3">
      <div className={`card border-start border-${color} shadow-sm`}>
        <div className="card-body d-flex align-items-center justify-content-between">
          <div>
            <h6 className="text-muted">{title}</h6>
            <h4 className="fw-bold mb-0">{value}</h4>
          </div>
          <div className={`text-${color} fs-3`}>
            <i className={`fas ${icon}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
