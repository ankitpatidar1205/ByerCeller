import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import BaseUrl from '../../Utilities/BaseUrl';
import axiosInstance from '../../Utilities/axiosInstance';

const AddUser = () => {
  const { id } = useParams(); // extract ID from URL
  console.log(id)
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    password: '',
    confirmPassword: '',
    role: 'buyer',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    if (id) {
      const fetchUserProfile = async () => {
        try {
          const response = await axiosInstance.get(`/user/getUserById/${id}`);
          const data = response.data.data;
          setFormData({
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            email: data.email || '',
            mobileNumber: data.mobileNumber || '',
            password: '',
            confirmPassword: '',
            role: data.role || 'buyer',
          });
        } catch (error) {
          toast.error("Failed to fetch user data");
        }
      };

      fetchUserProfile();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      if (id) {
        // Edit mode
        const response = await axiosInstance.patch(`/user/editProfile/${id}`, formData);
        toast.success(response.data.message || 'User updated successfully');
      } else {
        // Create mode
        const response = await axios.post(`${BaseUrl}/user/signUp`, formData);
        toast.success(response.data.message || 'User created successfully');
      }

      setTimeout(() => {
        navigate('/users');
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  return (
    <>
      <ToastContainer position="top-center" />
      <div className="container mt-5">
        <h2 className="mb-4">{id ? 'Edit User' : 'Create Account'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="firstName" className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="Enter first name"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="lastName" className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="Enter last name"
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email Address</label>
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
            <label htmlFor="mobileNumber" className="form-label">Mobile Number</label>
            <input
              type="number"
              className="form-control"
              id="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              required
              placeholder="Enter your Mobile Number"
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
              placeholder="Create password"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Re-enter password"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="role" className="form-label">Select Role</label>
            <select
              id="role"
              className="form-select"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
              <option value="broker">Broker</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            {id ? 'Update User' : 'Sign Up'}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddUser;
