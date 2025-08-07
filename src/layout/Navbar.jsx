import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/image-removebg-preview.png'
const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  // ✅ Extract user data from localStorage
const user = JSON.parse(localStorage.getItem("user"));
console.log(user)

let displayName = "MASTER IONE"; // Default for admin or unknown

if (user?.role === "buyer") {
  displayName = `IONE B ${user?.mobileNumber || ""}`;
} else if (user?.role === "seller") {
  displayName = `IONE S ${user?.mobileNumber || ""}`;
} else if (user?.role === "broker") {
  displayName = `IONE M ${user?.mobileNumber || ""}`;
} else if (user?.role === "admin") {
  displayName = "MASTER IONE";
}


  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <nav className="navbar navbar-white  shadow-sm flex-nowrap" style={{backgroundColor:"#1f2a40"}}>
        <div className="container-fluid d-flex justify-content-between align-items-center">
          {/* Left: Logo + Toggle */}
          <div className="d-flex align-items-center gap-3">

                    <Link to="/">
              <img  src={logo}   alt="logo"  className="h-10" style={{ background : "transparent"}}/>
            </Link>
            <button   className="btn btn-outline-light d-lg-none me-2"    onClick={toggleSidebar} >
              <i className="bi bi-list fs-4 text-white "></i>
            </button>
          </div>
          <div className="d-flex align-items-center gap-3">
           <span className="fw-bold text-white"> {displayName}</span>
            <div className="dropdown">
              <button  className="btn d-flex align-items-center gap-2 p-0 border-0 bg-transparent " data-bs-toggle="dropdown"
                aria-expanded="false" >
                <i className="bi bi-person fs-3 text-white"></i>  
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
