import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  // ✅ Extract user data from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const userRole = user?.role || "admin"; // fallback if role is undefined
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <nav className="navbar navbar-white bg-white shadow-sm border">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          {/* Left: Logo + Toggle */}
          <div className="d-flex align-items-center gap-3">

           <Link to="/">
            <img  height={80}   width={130}
              src="https://i.postimg.cc/qBKyqcWd/1-removebg-preview.png" alt="Logo" />
           </Link>
            <button   className="btn btn-outline-secondary d-lg-none"    onClick={toggleSidebar} >
              <i className="bi bi-list fs-4"></i>
            </button>
          </div>
          <div className="d-flex align-items-center gap-3">
           <span className="fw-bold"> 👋  Hi,{userRole}</span>
            <div className="dropdown">
              <button  className="btn d-flex align-items-center gap-2 p-0 border-0 bg-transparent " data-bs-toggle="dropdown"
                aria-expanded="false" >
                <i className="bi bi-person fs-3 text-secondary"></i>  
              </button>
              <ul className="dropdown-menu dropdown-menu-end shadow-sm mt-2">
                <li>
                  <Link to="/Admin-Profile" className="dropdown-item">
                    My Profile
                  </Link>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button className="dropdown-item" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
