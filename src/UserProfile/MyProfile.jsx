import React, { useEffect, useState } from "react";
import axiosInstance from "../Utilities/axiosInstance";

const MyProfile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // Fetch user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("user"));
        if (userData && userData.id) {
          const response = await axiosInstance.get(`/user/getUserById/${userData.id}`);
          setUser(response.data.data);
          setFormData({
            firstName: response.data.data.firstName || "",
            lastName: response.data.data.lastName || "",
            email: response.data.data.email || "",
            password: "", // Leave password blank for security
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      const response = await axiosInstance.patch(`/user/editProfile/${userData.id}`, formData);
      alert("Profile updated successfully");
      setUser(response.data.data);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Something went wrong while updating.");
    }
  };

  if (loading) return <div>Loading profile...</div>;
  if (!user) return <div>Failed to load profile.</div>;

  return (
    <div className="card shadow-sm rounded p-4 mb-4">
      <h4 className="mb-4 fw-bold">My Profile</h4>

      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Enter new password"
            value={formData.password}
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>
      </div>

      <div className="mt-4">
        {!editMode ? (
          <button className="btn custom-button" onClick={() => setEditMode(true)}>
            Edit Profile
          </button>
        ) : (
          <>
            <button className="btn btn-success me-2" onClick={handleSave}>
              Save Changes
            </button>
            <button className="btn btn-secondary" onClick={() => setEditMode(false)}>
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
