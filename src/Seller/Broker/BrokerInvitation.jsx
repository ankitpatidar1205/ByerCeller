import React, { useEffect, useState } from "react";
import {
  FaSearch,
  FaTimes,
  FaCheckCircle,
} from "react-icons/fa";
import axiosInstance from "../../Utilities/axiosInstance";
import { useNavigate } from "react-router-dom";



export const mockInvitations = [
  {
    id: 1,
    company_name: "HK KANDIVAN INTERNATIONAL TRADING COMPANY LIMITED",
    contact_name: "KHALIL HISHAM ABDALLAH SHWAIKI",
    phone: "008613332800284",
    ione_code: "IONE008613332800284",
    address: "H A192/193, Shenzhen Huaqiang North Manah A Building, manha, Shenzhen city, Dongguan province, China 🇨🇳",
    category: "Trucks spare parts",
    note: "This broker can see the updated categories when integrated with the seller and buyer",
    status: "Pending",
    role: "broker",
  },
  // {
  //   id: 2,
  //   company_name: "XINLONG AUTO EXPORTS CO. LTD",
  //   contact_name: "WANG LEI",
  //   phone: "008613355509909",
  //   ione_code: "IONE008613355509909",
  //   address: "Room 308, Tower C, Guangzhou Business Center, Guangzhou City, China",
  //   category: "Engine Parts",
  //   note: "Pending approval from buyer",
  //   status: "Pending",
  //   role: "broker",
  // },
  // {
  //   id: 3,
  //   company_name: "MEGA PARTS INTL",
  //   contact_name: "HUSSEIN AL AMEERI",
  //   phone: "00971556677883",
  //   ione_code: "IONE00971556677883",
  //   address: "Office 23, Auto Market, Sharjah, UAE",
  //   category: "Body Parts",
  //   note: "Integrated with 2 sellers already",
  //   status: "Accepted",
  //   role: "broker",
  // },
];

const BrokerInvitations = () => {

    const navigate = useNavigate();
  const [invitations, setInvitations] = useState([]);
  const [filteredInvitations, setFilteredInvitations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  console.log("invitations", invitations)

  
  console.log("filteredInvitations", filteredInvitations)
  useEffect(() => {
  // simulate fetching data
  setInvitations(mockInvitations);
  setFilteredInvitations(mockInvitations);
}, []);


//   const fetchInvitations = async () => {
//     try {
//       const response = await axiosInstance.get(`/broker/invitations`);
//       setInvitations(response.data.data || []);
//       setFilteredInvitations(response.data.data || []);
//     } catch (error) {
//       console.error("Error fetching invitations:", error);
//     }
//   };

//   useEffect(() => {
//     const filtered = invitations.filter((invite) =>
//       invite?.broker_name?.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
//       invite?.email?.toLowerCase().includes(searchTerm.toLowerCase().trim())
//     );
//     setFilteredInvitations(filtered);
//   }, [searchTerm, invitations]);

  const handleAcceptInvitation = async (invitationId) => {
    try {
      await axiosInstance.post(`/broker/accept/${invitationId}`);
      fetchInvitations();
    } catch (error) {
      console.error("Error accepting invitation:", error);
    }
  };

  return (
    <div className="container-fluid py-4 px-3 px-md-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h4 fw-bold mb-1">Broker Invitations</h2>
          <p className="text-muted">View and manage broker invitations</p>
        </div>
      </div>

      {/* Search */}
      <div className="card mb-4 border-0 shadow-sm">
        <div className="card-body p-3">
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0">
              <FaSearch className="text-muted" />
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Search by broker name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => setSearchTerm("")}
              >
                <FaTimes />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Invitations Table */}
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <h5 className="card-title mb-3">Invitations</h5>
          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle text-nowrap mb-0">
              <thead className="table-light">
                <tr>
                  <th>Req. Id</th>
                  <th>Broker Name</th>
                  {/* <th>Email</th> */}
                  <th>Phone</th>
                  <th>Company</th>
                  <th>Status</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {invitations.length > 0 ? (
                  invitations.map((invite, index) => (
                    <tr key={invite.id}>
                      <td>{invite.id + 1}</td>
                      <td>{invite.contact_name}</td>
                      {/* <td>{invite.email}</td> */}
                      <td>{invite.phone || "N/A"}</td>
                      <td>{invite.company_name || "N/A"}</td>
                      <td>
                        {invite.status === "Accepted" ? (
                          <span className="badge bg-success">Accepted</span>
                        ) : (
                          <span className="badge bg-warning text-dark">Pending</span>
                        )}
                      </td>
                      <td className="text-end">

                 
                            <i className="fa fa-eye me-2" onClick={()=> navigate("/seller/broker-details")} ></i>
                        


                        {invite.status !== "Accepted" && (
                          <button
                            className="btn btn-sm btn-success"
                            onClick={() => handleAcceptInvitation(invite.id)}
                          >
                            {/* <FaCheckCircle className="me-1" /> */}
                            Accept
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-5">
                      <FaSearch size={48} className="text-muted mb-3" />
                      <h5 className="fw-semibold">No invitations found</h5>
                      <p className="text-muted">Try adjusting your search</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrokerInvitations;
