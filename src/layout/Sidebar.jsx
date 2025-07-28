import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ collapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: "fa-solid fa-gauge" },
    { name: "Categories", path: "/categories", icon: "fa-solid fa-list" },
    { name: "Add Products", path: "/addproducts", icon: "fa-solid fa-plus" },
    { name: "Products List", path: "/products", icon: "fa-solid fa-boxes-stacked" },
    { name: "All Orders", path: "/orders", icon: "fa-solid fa-cart-shopping" },
    { name: "Manage Users", path: "/users", icon: "fa-solid fa-users" },
    { name: "Manage Inventory", path: "/inventory", icon: "fa-solid fa-warehouse" },
    { name: "Manage Banner", path: "/bannermanager", icon: "fa-solid fa-image" },
    { name: "Report Analytics", path: "/MainReport", icon: "fa-solid fa-chart-line" },
     { name: "Profile", path: "/Admin-Profile", icon: "fa-solid fa-user-circle" }

  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className={`sidebar-container ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar">
        <ul className="menu">
          {menuItems.map((item, index) => (
            <li 
              key={index} 
              className={`menu-item ${isActive(item.path) ? "active" : ""}`}
              data-tooltip={collapsed ? item.name : ""}
            >
              <div
                className="menu-link"
                onClick={() => navigate(item.path)}
              >
                <i className={item.icon}></i>
                <span className="menu-text">{item.name}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;