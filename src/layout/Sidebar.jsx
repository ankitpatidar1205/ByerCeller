import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ collapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState(null);

  // useEffect se role ko localStorage se set karna
  useEffect(() => {
    const storedRole = localStorage.getItem("role"); // e.g. "admin" | "user" | "broker" | "seller"
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  // Admin menu
  const adminMenu = [
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

  // User menu
  const userMenu = [
    { name: "Dashboard", path: "/UserDashboard", icon: "fa-solid fa-user-circle" },
    { name: "My Profile", path: "/MyProfile", icon: "fa-solid fa-user-circle" },
    { name: "My Orders", path: "/myorders", icon: "fa-solid fa-cart-shopping" },
    { name: "Wishlist", path: "/wishlist", icon: "fa-solid fa-heart" }
  ];

  // Broker menu
  const brokerMenu = [
    { name: "Broker Dashboard", path: "/broker/dashboard", icon: "fa-solid fa-briefcase" },
        { name: "Broker Products", path: "/broker/products", icon: "fa-solid fa-briefcase" },
    { name: "Buyer Deals", path: "/broker/buyerrequest", icon: "fa-solid fa-handshake" },
     { name: "Seller Deals", path: "/broker/sellerrequest", icon: "fa-solid fa-handshake" },
    { name: "Reports", path: "/broker/reports", icon: "fa-solid fa-chart-pie" },
    { name: "Profile", path: "/broker/profile", icon: "fa-solid fa-user-tie" }
  ];

  // Seller menu
  const sellerMenu = [
    { name: "Seller Dashboard", path: "/seller/dashboard", icon: "fa-solid fa-store" },
      { name: "Categories", path: "/seller/categories", icon: "fa-solid fa-list" },

    { name: "Add Products", path: "/seller/addproducts", icon: "fa-solid fa-plus" },
    { name: "My Products", path: "/seller/products", icon: "fa-solid fa-boxes-stacked" },
     { name: "Broker Invites", path: "/seller/brokerinvitation", icon: "fa-solid fa-user-circle" },
    { name: "Orders", path: "/seller/orders", icon: "fa-solid fa-cart-shopping" },
      { name: "Manage Inventory", path: "/inventory", icon: "fa-solid fa-warehouse" },
    { name: "Profile", path: "/seller/profile", icon: "fa-solid fa-user-circle" }
  ];

  // Role ke hisaab se menu select karna
  const menuItems =
    role === "admin"
      ? adminMenu
      : role === "broker"
      ? brokerMenu
      : role === "seller"
      ? sellerMenu
      : userMenu; // default = user

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
              <div className="menu-link" onClick={() => navigate(item.path)}>
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
