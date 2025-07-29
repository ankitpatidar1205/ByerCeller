import { Link } from "react-router-dom";

const UserDashboard = () => {
  // Dummy Stats
  const stats = {
    totalOrders: 12,
    pendingOrders: 2,
    shippedOrders: 3,
    deliveredOrders: 7,
  };

  // Dummy Recent Orders
  const recentOrders = [
    { id: "ORD1005", product: "Truck Engine Part", date: "2025-07-26", status: "Shipped", price: "$499" },
    { id: "ORD1004", product: "iPhone 14 Pro Max", date: "2025-07-25", status: "Delivered", price: "$1,299" },
    { id: "ORD1003", product: "Brake Pads", date: "2025-07-24", status: "Pending", price: "$199" },
  ];

  return (
    <div className="container my-4">
      <h2 className="fw-bold mb-4">Buyer Dashboard</h2>

      {/* Stats Cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="card shadow-sm text-center p-3 border-0">
            <h5 className="fw-bold">{stats.totalOrders}</h5>
            <p className="text-muted mb-0">Total Orders</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm text-center p-3 border-0">
            <h5 className="fw-bold text-warning">{stats.pendingOrders}</h5>
            <p className="text-muted mb-0">Pending Orders</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm text-center p-3 border-0">
            <h5 className="fw-bold text-info">{stats.shippedOrders}</h5>
            <p className="text-muted mb-0">Shipped Orders</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm text-center p-3 border-0">
            <h5 className="fw-bold text-success">{stats.deliveredOrders}</h5>
            <p className="text-muted mb-0">Delivered Orders</p>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="card shadow-sm rounded mb-4">
        <div className="card-body">
          <h5 className="fw-bold mb-3">Recent Orders</h5>
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Order ID</th>
                  <th>Product</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.product}</td>
                    <td>{order.date}</td>
                    <td>
                      <span
                        className={`badge ${
                          order.status === "Delivered"
                            ? "bg-success"
                            : order.status === "Shipped"
                            ? "bg-info"
                            : "bg-warning text-dark"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td>{order.price}</td>
                    <td>
                      <Link to="/myorders" className="btn btn-sm btn-outline-primary">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-end">
            <Link to="/myorders" className="btn btn-primary">
              View All Orders
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="row g-3">
        <div className="col-md-6">
          <div className="card shadow-sm p-3 text-center">
            <h6 className="fw-bold mb-2">Need More Products?</h6>
            <Link to="/UserProduct" className="btn btn-outline-primary">Browse Products</Link>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card shadow-sm p-3 text-center">
            <h6 className="fw-bold mb-2">Looking for Better Deals?</h6>
            <Link to="/request-broker" className="btn btn-outline-success">Request Broker</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
