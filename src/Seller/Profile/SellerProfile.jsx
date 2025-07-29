import React, { useEffect, useState } from "react";

import { Modal, Button } from "react-bootstrap";
import Loader from "../../Loader/Loader";
import axiosInstance from "../../Utilities/axiosInstance";


const SellerProfile = () => {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const userData = JSON.parse(localStorage.getItem("user"));
  const userId = userData?.id;

  const fetchProfile = async () => {
    try {
    //   const res = await axiosInstance.get(`/user/getUserById/${userId}`);
    //   const data = res.data?.data;

      setProfile({
        firstName:  "Seller",
        lastName: "last Name",
        email:  "seller@example.com",
        password: "",
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

  if (loading) return <div className="p-4"><Loader /></div>;

  return (
    <div className="container py-4">
      <h2 className="mb-4 fw-bold"> Profile</h2>
      <div className="card p-4 shadow-sm">
        <div className="row align-items-center">
          
          <div className="col-md-9">
            <div className="row mb-2">
              <div className="col-md-6">
                <strong>First Name:</strong> {profile.firstName}
              </div>
              <div className="col-md-6">
                <strong>Last Name:</strong> {profile.lastName}
              </div>
            </div>
            <div className="mb-2">
              <strong>Email:</strong> {profile.email}
            </div>
            <Button variant="primary" onClick={() => setShowModal(true)}>
              Edit Profile
            </Button>
          </div>
        </div>
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

export default SellerProfile;
