import React from 'react';

const RecentRequestsTable = () => {
  const requests = [
    {
      type: 'Buyer → Broker',
      from: 'IONE00972598361988',
      to: 'IONE008613332800284',
      company: 'BASAMCO → HK Kandivan',
      status: 'Accepted',
    },
    {
      type: 'Broker → Seller',
      from: 'IONE008613332800284',
      to: 'IONE0086158613121',
      company: 'HK Kandivan → YINGJIA',
      status: 'Accepted',
    },
  ];

  const buyerRequests = requests.filter(req => req.type === 'Buyer → Broker');
  const sellerRequests = requests.filter(req => req.type === 'Broker → Seller');

  const renderTable = (data, title) => (
    <div className="card shadow-sm p-3 mt-4">
      <h6 className="mb-3">{title}</h6>
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Type</th>
              <th>From (IONE)</th>
              <th>To (IONE)</th>
              <th>Company</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center text-muted">No records found</td>
              </tr>
            ) : (
              data.map((req, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{req.type}</td>
                  <td>{req.from}</td>
                  <td>{req.to}</td>
                  <td>{req.company}</td>
                  <td>
                    <span className={`badge bg-${req.status === 'Accepted' ? 'success' : 'warning'}`}>
                      {req.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <>
      {renderTable(buyerRequests, 'Buyer Requests')}
      {renderTable(sellerRequests, 'Seller Requests')}
    </>
  );
};

export default RecentRequestsTable;
