import { useEffect, useState } from "react";
import { FaUsers, FaStore, FaHandshake, FaClipboardList, FaCheck, FaTimes } from "react-icons/fa";
import axiosInstance from "../../Utilities/axiosInstance";
import Loader from "../../Loader/Loader";

const AdminDashboard = () => {
  const [buyers, setBuyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("buyers");

  // Dummy sellers and brokers (with approval status)
  const [dummySellers, setDummySellers] = useState([
    { id: "S1", name: "YINGJIA Manufacturer", email: "seller1@gmail.com", role: "Seller", status: "Pending" },
    { id: "S2", name: "Truck Parts Co.", email: "seller2@gmail.com", role: "Seller", status: "Pending" },
  ]);

  const [dummyBrokers, setDummyBrokers] = useState([
    { id: "B1", name: "Broker Alpha", email: "broker1@gmail.com", role: "Broker", status: "Pending" },
    { id: "B2", name: "Broker Beta", email: "broker2@gmail.com", role: "Broker", status: "Approved" },
  ]);

  useEffect(() => {
    const fetchBuyers = async () => {
      try {
        const res = await axiosInstance.get("/user/getAllUsers");
        setBuyers(res.data.data || []);
      } catch (error) {
        console.error("Error fetching buyers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBuyers();
  }, []);

  const handleApproval = (type, id, decision) => {
    if (type === "seller") {
      setDummySellers((prev) =>
        prev.map((seller) =>
          seller.id === id ? { ...seller, status: decision } : seller
        )
      );
    } else {
      setDummyBrokers((prev) =>
        prev.map((broker) =>
          broker.id === id ? { ...broker, status: decision } : broker
        )
      );
    }
  };

  const stats = [
    { title: "Total Buyers", count: buyers.length, icon: <FaUsers size={26} />, color: "primary" },
    { title: "Total Sellers", count: dummySellers.length, icon: <FaStore size={26} />, color: "success" },
    { title: "Total Brokers", count: dummyBrokers.length, icon: <FaHandshake size={26} />, color: "warning" },
    { title: "Pending Approvals", count: [...dummySellers, ...dummyBrokers].filter((u) => u.status === "Pending").length, icon: <FaClipboardList size={26} />, color: "danger" },
  ];

  // Reusable table
  const renderTable = (data, type) => (
    <div className="table-responsive">
      <table className="table table-hover align-middle">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            {type !== "buyer" && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.name || `${user.firstName} ${user.lastName}`}</td>
                <td>
                  <a href={`mailto:${user.email}`} className="text-primary">
                    {user.email}
                  </a>
                </td>
                <td>
                  <span className="badge bg-info text-dark">{user.role || "Buyer"}</span>
                </td>
                <td>
                  <span
                    className={`badge ${
                      user.status === "Approved"
                        ? "bg-success"
                        : user.status === "Rejected"
                        ? "bg-danger"
                        : "bg-warning text-dark"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                {type !== "buyer" && (
                  <td>
                    {user.status === "Pending" ? (
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-sm btn-outline-success"
                          onClick={() => handleApproval(type, user.id, "Approved")}
                          title="Approve">
                          <FaCheck />
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleApproval(type, user.id, "Rejected")}
                          title="Reject">
                          <FaTimes />
                        </button>
                      </div>
                    ) : (
                      <span className="text-muted">No Action</span>
                    )}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={type === "buyer" ? "5" : "6"} className="text-center py-4 text-muted">
                No records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="container my-4">
      <h2 className="fw-bold mb-4">User Management </h2>

      {/* Stats */}
      <div className="row g-4 mb-4">
        {stats.map((stat, index) => (
          <div className="col-md-6 col-lg-3" key={index}>
            <div className={`card shadow-sm border-0 rounded text-white bg-${stat.color}`}>
              <div className="card-body d-flex align-items-center justify-content-between">
                <div>
                  <h5 className="fw-bold">{stat.title}</h5>
                  <h2 className="mb-0">{stat.count}</h2>
                </div>
                <div className="bg-white text-dark rounded-circle p-3 shadow">
                  {stat.icon}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="card shadow-sm border-0 rounded">
        <div className="card-body">
          <ul className="nav nav-tabs mb-3">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "buyers" ? "active" : ""}`}
                onClick={() => setActiveTab("buyers")}>  Buyers </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "sellers" ? "active" : ""}`}  onClick={() => setActiveTab("sellers")}>
                Sellers
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "brokers" ? "active" : ""}`}  onClick={() => setActiveTab("brokers")}>
                Brokers
              </button>
            </li>
          </ul>

          {loading ? (
            <div className="text-center py-4">
              <Loader />
            </div>
          ) : activeTab === "buyers" ? (
            renderTable(buyers.slice(0, 5), "buyer")
          ) : activeTab === "sellers" ? (
            renderTable(dummySellers, "seller")
          ) : (
            renderTable(dummyBrokers, "broker")
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
