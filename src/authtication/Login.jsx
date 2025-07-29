import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BaseUrl from '../Utilities/BaseUrl';
import Navbar from '../Home/Navbar';
import Footer from '../Home/Footer';
import { Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [roleSelected, setRoleSelected] = useState("admin"); // default role
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Submit for Admin/User 
  // aa
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (roleSelected === "seller" || roleSelected === "broker") {
      // Seller / Broker → Direct login without API
      localStorage.setItem("role", roleSelected);
      localStorage.setItem("token", "dummy-token"); 
      localStorage.setItem(
        "user",
        JSON.stringify({ email: `${roleSelected}@example.com`, role: roleSelected })
      );

      toast.success(`${roleSelected} login successful!`, { position: "top-center" });

      setTimeout(() => {
        navigate(`/${roleSelected}/dashboard`);
      }, 1200);
      return;
    }

    try {
      // Admin/User → Login via API
      const response = await axios.post(`${BaseUrl}/user/login`, {
        email: formData.email,
        password: formData.password,
      });

      const { token, role } = response.data.data;

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('user', JSON.stringify(response.data.data));

      toast.success('Login successful!', { position: 'top-center' });

      setTimeout(() => {
        if (role === 'admin') navigate('/admin/dashboard');
        else navigate('/UserDashboard');
      }, 1200);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed', {
        position: 'top-center',
      });
    }
  };

  // Quick Fill Credentials
  // Quick Fill Credentials
  const autoFillCredentials = () => {
    if (roleSelected === "admin") {
      setFormData({ email: "admin@example.com", password: "1234" });
    } else if (roleSelected === "user") {
      setFormData({ email: "ankit@gmail.com", password: "1234" });
    } else {
      setFormData({ email: "", password: "" });
    }
  };


  return (
    <>
      <Navbar />
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light px-3">
        <ToastContainer />
        <div className="card shadow-lg rounded-4 border-0 w-100" style={{ maxWidth: '900px' }}>
          <div className="row g-0 flex-column flex-md-row">
            
            <div className="col-md-6 p-4 p-md-5 bg-white rounded-top rounded-md-start mt-5">
              <h3 className="mb-4 text-primary fw-bold text-center text-md-start">Welcome Back</h3>

              {/* Role Selection */}
              <div className="mb-3">
                <label className="form-label fw-bold">Select Role</label>
                <select
                  className="form-select"
                  value={roleSelected}
                  onChange={(e) => {
                    setRoleSelected(e.target.value);
                    autoFillCredentials();
                  }}
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                  <option value="seller">Seller</option>
                  <option value="broker">Broker</option>
                </select>
              </div>

              <form onSubmit={handleSubmit}>
                {roleSelected === "admin" || roleSelected === "user" ? (
                  <>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email address</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter your email"
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder="Enter your password"
                      />
                    </div>
                  </>
                ) : (
                  <p className="text-muted">
                    For <b>{roleSelected}</b> login, no credentials required. Click <b>Login</b> to continue.
                  </p>
                )}

                <button type="submit" className="btn btn-primary w-100 rounded-pill">
                  Login
                </button>
              </form>

              <p className="mt-4 text-center text-muted">
                Don't have an account? <Link to="/signup">Register</Link>
              </p>
            </div>

            <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center bg-light rounded-bottom rounded-md-end">
              <img
                src="https://i.postimg.cc/x1hDCY72/9ec3f58b834b966a8b7e5f399aa44692.jpg"
                alt="Login Visual"
                className="img-fluid rounded-bottom rounded-md-end"
                style={{ objectFit: 'cover', maxHeight: '100%', width: '100%' }}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
