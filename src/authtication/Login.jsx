import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BaseUrl from '../Utilities/BaseUrl';
import Navbar from '../Home/Navbar';
import Footer from '../Home/Footer';

const Login = () => {
  const navigate = useNavigate();

  const [roleSelected, setRoleSelected] = useState("admin"); 
  const [formData, setFormData] = useState({
    email: "admin@example.com",
    password: "1234",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const setRole = (role) => {
    setRoleSelected(role);
    if (role === "admin") {
      setFormData({ email: "admin@example.com", password: "1234" });
    } else if (role === "user") {
      setFormData({ email: "ankit@gmail.com", password: "1234" });
    } else if (role === "seller") {
      setFormData({ email: "seller@gmail.com", password: "1234" });
    } else if (role === "broker") {
      setFormData({ email: "broker@gmail.com", password: "1234" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (roleSelected === "seller" || roleSelected === "broker") {
      // Dummy login
      localStorage.setItem("role", roleSelected);
      localStorage.setItem("token", "dummy-token");
      localStorage.setItem(
        "user",
        JSON.stringify({ email: formData.email, role: roleSelected })
      );

      toast.success(`${roleSelected} login successful!`, { position: "top-center" });
      setTimeout(() => {
        navigate(`/${roleSelected}/dashboard`);
      }, 1200);
      return;
    }

    // Admin/User API login
    try {
      const response = await axios.post(`${BaseUrl}/user/login`, formData);

      const { token, role } = response.data.data;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("user", JSON.stringify(response.data.data));

      toast.success("Login successful!", { position: "top-center" });
      setTimeout(() => {
        if (role === "admin") navigate("/admin/dashboard");
        else navigate("/UserDashboard");
      }, 1200);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed", {
        position: "top-center",
      });
    }
  };

  return (
    <>
      {/* <Navbar /> */}
  <div className=" d-flex justify-content-center align-items-center vh-100">
  <ToastContainer />
  <div className="card login-card shadow-lg border-0">
    <div className="card-body p-4 p-md-5">
      <h2 className="login-title text-center mb-3">Welcome Back 👋</h2>
      <p className="text-muted text-center mb-4">Choose a role or login with your credentials</p>

      {/* Login Form */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="form-label fw-semibold">Email</label>
          <input
            type="email"
            id="email"
            className="form-control custom-input"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="form-label fw-semibold">Password</label>
          <input
            type="password"
            id="password"
            className="form-control custom-input"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
          />
        </div>

        <button type="submit" className="btn login-btn w-100 rounded-pill">
          Login
        </button>
      </form>

      {/* Role Buttons */}
      <div className="role-buttons d-flex justify-content-center gap-2 gap-md-3 mt-4 flex-wrap">
        <button
          type="button"
          className={`btn role-btn ${roleSelected === "admin" ? "selected-admin" : "outline-admin"}`}
          onClick={() => setRole("admin")}
        >
          Admin
        </button>
        <button
          type="button"
          className={`btn role-btn ${roleSelected === "user" ? "selected-user" : "outline-user"}`}
          onClick={() => setRole("user")}
        >
          Buyer
        </button>
        <button
          type="button"
          className={`btn role-btn ${roleSelected === "seller" ? "selected-seller" : "outline-seller"}`}
          onClick={() => setRole("seller")}
        >
          Seller
        </button>
        <button
          type="button"
          className={`btn role-btn ${roleSelected === "broker" ? "selected-broker" : "outline-broker"}`}
          onClick={() => setRole("broker")}
        >
          Broker
        </button>
      </div>

      <p className="signup-text mt-4 text-center">
        Don’t have an account? <Link to="/signup" className="signup-link">Register</Link>
      </p>
<Link to="/forgotpassword" className="text-center d-block mt-2">
      <p className='text-center signup-link cursor-pointer'>Forgot Password</p>
      </Link>
    </div>
  </div>
</div>


      {/* <Footer /> */}
    </>
  );
};

export default Login;
