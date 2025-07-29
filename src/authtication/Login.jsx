import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
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
      <Navbar />
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light px-3">
        <ToastContainer />
        <div className="card shadow-lg rounded-4 border-0 w-100" style={{ maxWidth: "600px" }}>
          <div className="card-body p-4">
            <h3 className="mb-4 text-primary fw-bold text-center">Welcome Back</h3>
            <p className="text-muted text-center">Choose a role or update credentials to login</p>

            {/* Login Form */}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-bold">Email</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter email"
                />
              </div>

          
                <div className="mb-3">
                  <label htmlFor="password" className="form-label fw-bold">Password</label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Enter password"
                  />
                </div>
            

              <button type="submit" className="btn btn-primary w-100 rounded-pill">
                Login
              </button>
            </form>
            
               {/* Role Buttons */}
            <div className="d-flex justify-content-center gap-2 mb-4 mt-3 flex-wrap">
              <button
                type="button"
                className={`btn ${roleSelected === "admin" ? "btn-primary" : "btn-outline-primary"} rounded-pill`}
                onClick={() => setRole("admin")}
              >
                Admin
              </button>
              <button
                type="button"
                className={`btn ${roleSelected === "user" ? "btn-success" : "btn-outline-success"} rounded-pill`}
                onClick={() => setRole("user")}
              >
                Buyer 
              </button>
              <button
                type="button"
                className={`btn ${roleSelected === "seller" ? "btn-warning" : "btn-outline-warning"} rounded-pill`}
                onClick={() => setRole("seller")}
              >
                Seller
              </button>
              <button
                type="button"
                className={`btn ${roleSelected === "broker" ? "btn-info" : "btn-outline-info"} rounded-pill`}
                onClick={() => setRole("broker")}
              >
                Broker
              </button>
            </div>
              <p className="mt-4 text-center text-muted">
              Don't have an account? <Link to="/signup">Register</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
