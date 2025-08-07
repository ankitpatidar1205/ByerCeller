import React, { useEffect, useState } from "react";
import { FaTrash, FaEye, FaUsers, FaUserTie, FaUser, FaHandshake, FaPlusCircle, FaEdit } from "react-icons/fa";
import axiosInstance from "../../Utilities/axiosInstance";
import Loader from "../../Loader/Loader";
import { Link } from "react-router-dom";

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeTab, setActiveTab] = useState("buyer");
  const usersPerPage = 8;

  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get("/user/getAllUsers");
      setUsers(res.data.data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/user/deleteUserById/${id}`);
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Stats
  const totalUsers = users.length;
  const totalBuyers = users.filter((u) => u.role === "buyer").length;
  const totalSellers = users.filter((u) => u.role === "seller").length;
  const totalBrokers = users.filter((u) => u.role === "broker").length;

  // Filter users by tab
  const tabFilteredUsers =
    activeTab === "buyer"
      ? users.filter((u) => u.role === "buyer")
      : activeTab === "seller"
      ? users.filter((u) => u.role === "seller")
      : activeTab === "broker"
      ? users.filter((u) => u.role === "broker")
      : users;

  // Apply search
  const filteredUsers = tabFilteredUsers.filter(
    (user) =>
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user?.role?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className="p-4">
      {/* Title */}
      <div className="mb-3">
        <h3 className="fw-bold">User Management</h3>
        <p className="text-muted mb-0">Manage all registered users</p>
      </div>

      {/* Overview Cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="card shadow-sm text-center border-primary">
            <div className="card-body">
   
              <h6 className="fw-bold">Total Users</h6>
              <h4>{totalUsers}</h4>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm text-center border-success">
            <div className="card-body">
           
              <h6 className="fw-bold">Total Buyers</h6>
              <h4>{totalBuyers}</h4>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm text-center border-warning">
            <div className="card-body">
            
              <h6 className="fw-bold">Total Sellers</h6>
              <h4>{totalSellers}</h4>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm text-center border-danger">
            <div className="card-body">
           
              <h6 className="fw-bold">Total Brokers</h6>
              <h4>{totalBrokers}</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "buyer" ? "active" : ""}`}
            onClick={() => { setActiveTab("buyer"); setCurrentPage(1); }}>
            Buyers
          </button>
        </li>
        <li className="nav-item">
          <button  className={`nav-link ${activeTab === "seller" ? "active" : ""}`}
            onClick={() => { setActiveTab("seller"); setCurrentPage(1); }}>
            Sellers
          </button>
        </li>
        <li className="nav-item">
          <button  className={`nav-link ${activeTab === "broker" ? "active" : ""}`}
            onClick={() => { setActiveTab("broker"); setCurrentPage(1); }}>
            Brokers
          </button>
        </li>
      </ul>

      {/* Search Bar */}
      <div className="row mb-3">
     <div className="col-md-12">
  <div className="d-flex align-items-center justify-content-between gap-3">
    {/* Search Input */}
    <div className="input-group w-100 me-3">
      <span className="input-group-text bg-white"> <i className="bi bi-search"></i></span>
      <input  type="text"  className="form-control"  placeholder="Search users..."  value={searchTerm}
        onChange={(e) => {setSearchTerm(e.target.value);  setCurrentPage(1);}}/>
    </div>

    {/* Add Product Button */}
   <Link to="/AddUser"> <button className="btn custom-button d-flex align-items-center gap-2 white-space-nowrap">
      <FaPlusCircle />
      <span>Add User</span>
    </button></Link>
  </div>
</div>
      </div>

      {/* Table */}
      <div className="table-responsive bg-white rounded shadow-sm p-3">
        {loading ? (
          <div className="text-center py-4">
            <Loader />
          </div>
        ) : (
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th style={{ width: "120px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.length > 0 ? (
                currentUsers.map((user, index) => (
                  <tr key={user.id}>
                    <td>{indexOfFirstUser + index + 1}</td>
                    <td>{`${user.firstName} ${user.lastName}`}</td>
                    <td>
                      <a href={`mailto:${user.email}`} className="text-primary">
                        {user.email}
                      </a>
                    </td>
                    <td>{user.role}</td>
                    <td>
                      <div className="d-flex gap-2">
                       <Link to="/">  <button  className="btn btn-sm btn-outline-primary me-2" >
                             <FaEdit size={14} />
                         </button></Link>
                        <button
                          className="btn btn-sm btn-outline-primary"
                          title="View User"
                          onClick={() => setSelectedUser(user)}
                          data-bs-toggle="modal"
                          data-bs-target="#userModal"
                        >
                          <FaEye size={14} />
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          title="Delete User"
                          onClick={() => handleDelete(user.id)}
                        >
                          <FaTrash size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    <div className="text-muted">No users found</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="mt-4 d-flex justify-content-end">
          <ul className="pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <li
                key={i}
                className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* Modal */}
      <div className="modal fade"  id="userModal"  tabIndex="-1"  aria-labelledby="userModalLabel"  aria-hidden="true" >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="userModalLabel">User Details</h5>
              <button type="button" className="btn-close"  data-bs-dismiss="modal"  aria-label="Close"></button>
            </div>
            {selectedUser && (
              <div className="modal-body">
                <p><strong>Full Name:</strong> {selectedUser.firstName} {selectedUser.lastName}</p>
                <p><strong>Email:</strong> {selectedUser.email}</p>
                <p><strong>Role:</strong> {selectedUser.role}</p>
                <p><strong>ID:</strong> {selectedUser.id}</p>
              </div>
            )}
            <div className="modal-footer">
              <button  type="button"  className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
