import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../Utilities/axiosInstance";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Pricing = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/plan/getAllPlans`);
      setPlans(res.data.data);
    } catch (error) {
      console.error("Error fetching plans:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5 p-4 rounded">
        {/* Page Heading */}
        <div
          className="text-center mb-5 p-4 rounded-4"
          style={{
            background: "linear-gradient(to right, #e3f2fd, #f0f9ff)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <h1 className=" h2 fw-bold text-primary"> Pricing Plans</h1>
          <p className="text-muted fs-5 mb-0">
            Tailored solutions for <strong>Buyers</strong> & <strong>Sellers</strong>
          </p>
        </div>

        {/* Loading / No Data */}
        {loading ? (
          <p className="text-center fs-5">⏳ Loading plans...</p>
        ) : plans.length === 0 ? (
          <div className="alert alert-info text-center">
            🚫 No plans available. Please create one.
          </div>
        ) : (
          <div className="row">
            {plans.map((plan) => (
              <div key={plan.id} className="col-md-4 mb-4">
                <div
                  className="card h-100 border-0 shadow-sm rounded-4"
                  style={{ transition: "transform 0.3s ease" }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}>
                  <div className="card-body text-center d-flex flex-column">
                    {/* Plan Name */}
                    <h2 className="card-title fw-bold text-dark">{plan.name}</h2>

                    {/* Plan Price */}
                    <h3 className="text-primary fw-bold display-6 mt-2 mb-3">
                      ₹{plan.price}
                    </h3>

                    {/* Billing Type */}
                    <span className="badge bg-info-subtle text-primary mb-2 px-3 py-2 rounded-pill">
                      {plan.billingCycle}
                    </span>

                    {/* Description */}
                    <p className="text-muted small">{plan.description}</p>

                    {/* Features */}
                    <ul className="list-unstyled text-start mt-3 mb-4 px-4">
                      {plan.features.map((f, i) => (
                        <li key={i} className="mb-2">
                          ✅ {f.trim()}
                        </li>
                      ))}
                    </ul>

                    {/* Button */}
                    <button
                      className="btn custom-button w-100 mt-auto fw-semibold rounded-pill"
                      onClick={() => navigate("/signup")}
                    >
                      Request Plan
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Pricing;
