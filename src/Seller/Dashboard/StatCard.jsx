import React from "react";


const iconMap = {
  "fa-users": faUsers,
  "fa-store": faStore,
  "fa-dollar-sign": faDollarSign,
  "fa-arrow-down": faArrowDown,
  "fa-arrow-up": faArrowUp,
};

const StatCard = ({ title, value, icon, color = "primary", change }) => {
  return (
    <div className="col-md-4 col-lg-3">
      <div className={`card shadow border-start border-4 border-${color}`}>
        <div className="card-body d-flex align-items-center justify-content-between">
          <div>
            <h6 className="text-muted text-uppercase mb-1">{title}</h6>
            <h4 className="fw-bold mb-0">{value}</h4>
            {change && (
              <small className={`text-${color} fw-medium`}>{change}</small>
            )}
          </div>
          <FontAwesomeIcon
            icon={iconMap[icon]}
            className={`fs-2 text-${color}`}
          />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
