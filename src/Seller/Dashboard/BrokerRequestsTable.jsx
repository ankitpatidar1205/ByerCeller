import React from 'react';

const data = [
  // { name: 'John Doe', company: 'Prime Brokers Inc.', date: '2023-10-27', status: 'Pending' },
  // { name: 'Jane Smith', company: 'Global Trading', date: '2023-10-26', status: 'Connected' },
  // { name: 'Sam Wilson', company: 'Elite Commodities', date: '2023-10-25', status: 'Pending' },
  // { name: 'Emily Brown', company: 'Prestige Partners', date: '2023-10-24', status: 'Declined' },
];

const BrokerRequestsTable = () => (
  <div className="card shadow-sm p-3">
    <h5 className="mb-3">Recent Broker Requests</h5>
    <table className="table table-hover">
      <thead>
        <tr>
          <th>Broker Name</th>
          <th>Company</th>
          <th>Date</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((req, index) => (
          <tr key={index}>
            <td>{req.name}</td>
            <td>{req.company}</td>
            <td>{req.date}</td>
            <td>
              <span className={`badge bg-${req.status === 'Connected' ? 'success' : req.status === 'Pending' ? 'warning' : 'danger'}`}>
                {req.status}
              </span>
            </td>
            <td>
              {req.status === 'Pending' ? (
                <>
                  <button className="btn btn-link text-success p-0 me-2">Connect</button>
                  <button className="btn btn-link text-danger p-0">Decline</button>
                </>
              ) : (
                <button className="btn btn-link text-primary p-0">View</button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default BrokerRequestsTable;
