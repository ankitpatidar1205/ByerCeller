import React, { useEffect, useState } from "react";
import axiosInstance from "../../Utilities/axiosInstance";
import { Modal, Button } from "react-bootstrap";
import Loader from "../../Loader/Loader";

const AdminProfile = () => {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobileNumber: "",
    role: "",
  });
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const userData = JSON.parse(localStorage.getItem("user"));
  const userId = userData?.id;

  const fetchProfile = async () => {
    try {
      const res = await axiosInstance.get(`/user/getUserById/${userId}`);
      const data = res.data?.data;

      setProfile({
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        email: data.email || "",
        password: "", // Do not pre-fill password
        mobileNumber: data.mobileNumber || "",
        role: data.role || "",
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching profile:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const updatedData = {
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      mobileNumber: profile.mobileNumber,
      role: profile.role,
    };

    if (profile.password.trim() !== "") {
      updatedData.password = profile.password;
    }

    try {
      await axiosInstance.patch(`/user/editProfile/${userId}`, updatedData, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Profile updated successfully ✅");
      setShowModal(false);
      fetchProfile();
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Something went wrong ❌");
    }
  };

  if (loading) return <div className="p-4"><Loader/></div>;

  return (
    <div className="container py-4">
      <h2 className="mb-4 fw-bold">Admin Profile</h2>
      <div className="card p-4 shadow-sm">
        <div className="row mb-3">
          <div className="col-md-6">
            <strong>First Name:</strong> {profile.firstName}
          </div>
          <div className="col-md-6">
            <strong>Last Name:</strong> {profile.lastName}
          </div>
        </div>
        <div className="mb-3">
          <strong>Email:</strong> {profile.email}
        </div>
        <div className="mb-3">
          <strong>Mobile Number:</strong> {profile.mobileNumber}
        </div>
        <div className="mb-3">
          <strong>Role:</strong> {profile.role}
        </div>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Edit Profile
        </Button>
      </div>

      {/* MODAL */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                name="firstName"
                value={profile.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                name="lastName"
                value={profile.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-12">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={profile.email}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-12">
              <label className="form-label">Mobile Number</label>
              <input
                type="text"
                className="form-control"
                name="mobileNumber"
                value={profile.mobileNumber}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-12">
              <label className="form-label">Role</label>
              <input
                type="text"
                className="form-control"
                name="role"
                value={profile.role}
                disabled
              />
            </div>
            <div className="col-md-12">
              <label className="form-label">New Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={profile.password}
                onChange={handleChange}
                placeholder="Leave blank to keep unchanged"
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminProfile;