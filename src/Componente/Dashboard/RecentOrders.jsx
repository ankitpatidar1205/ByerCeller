
import  { useEffect, useState } from "react";
import {  FaEye } from "react-icons/fa";
import axiosInstance from "../../Utilities/axiosInstance";
const RecentOrders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const usersPerPage = 8;

  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get("/user/getAllUsers");
      const fetchedUsers = res.data.data || [];
      setUsers(fetchedUsers.reverse()); // 🔁 Reverse users for latest first
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

  const filteredUsers = users.filter(
    (user) =>
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className="p-4">
      <div className="table-responsive bg-white rounded shadow-sm p-3">
        {loading ? (
          <div className="text-center py-4">Loading users...</div>
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
                        <button className="btn btn-sm btn-outline-primary" title="View User"
                          onClick={() => setSelectedUser(user)} data-bs-toggle="modal" data-bs-target="#userModal">
                          <FaEye size={14} />
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
              <li  key={i}  className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                  {i + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* Modal for Viewing User */}
      <div  className="modal fade"  id="userModal"  tabIndex="-1"  aria-labelledby="userModalLabel"  aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="userModalLabel">User Details</h5>
              <button  type="button"  className="btn-close"  data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            {selectedUser && (
              <div className="modal-body">
                <p><strong>Full Name:</strong> {selectedUser.firstName} {selectedUser.lastName}</p>
                <p><strong>Email:</strong> {selectedUser.email}</p>
                <p><strong>Role:</strong> {selectedUser.role}</p>
                <p><strong>ID:</strong> {selectedUser.id}</p>
              </div>)}
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"> Close </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentOrders;


