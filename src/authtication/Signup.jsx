import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';
import BaseUrl from '../Utilities/BaseUrl';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'buyer', // default role
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      role: formData.role, // role send in payload
    };

    try {
      const response = await axios.post(`${BaseUrl}/user/signUp`, payload);
      toast.info(response.data.message || 'Signup successful');

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'buyer',
      });

      // Redirect after a short delay so toast shows
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <>
      <div className="signup-container d-flex justify-content-center align-items-center ">
        <ToastContainer position="top-center" />
        <div className="card signup-card shadow-lg border-0">
          <div className="row g-0 flex-column flex-md-row">
            <div className="col-12 p-4 p-md-5 bg-white signup-card">
              <h2 className="signup-title mb-3 text-center text-md-start">Create Account</h2>
              <p className="text-muted text-center text-md-start mb-4">
                Fill in your details to get started 🚀
              </p>

              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="firstName" className="form-label fw-semibold">First Name</label>
                    <input
                      type="text"
                      className="form-control custom-input"
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      placeholder="Enter first name"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="lastName" className="form-label fw-semibold">Last Name</label>
                    <input
                      type="text"
                      className="form-control custom-input"
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      placeholder="Enter last name"
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-semibold">Email Address</label>
                  <input
                    type="email"
                    className="form-control custom-input"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label fw-semibold">Password</label>
                  <input
                    type="password"
                    className="form-control custom-input"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Create password"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label fw-semibold">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control custom-input"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    placeholder="Re-enter password"
                  />
                </div>

                {/* Role Selection */}
                <div className="mb-4">
                  <label htmlFor="role" className="form-label fw-semibold">Select Role</label>
                  <select
                    id="role"
                    className="form-select custom-input"
                    value={formData.role}
                    onChange={handleChange}
                    required
                  >
                    <option value="buyer">Buyer</option>
                    <option value="seller">Seller</option>
                    <option value="broker">Broker</option>
                  </select>
                </div>

                <button type="submit" className="btn signup-btn w-100 rounded-pill">
                  Sign Up
                </button>
              </form>

              <p className="mt-4 text-center signup-text">
                Already have an account? <Link to="/login" className="signup-link">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
