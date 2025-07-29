import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../Utilities/axiosInstance";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Pricing = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ Fetch Plans
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
      <div className="container bg-white mt-5 p-4 rounded shadow">
        
        {/* Page Heading */}
        <div className="text-center mb-5">
          <h1 className="fw-bold text-primary"> Pricing Plans</h1>
          <p className="text-muted fs-5">
            Tailored solutions for <strong>Buyers</strong> & <strong>Sellers</strong>
          </p>
        </div>

        {/* Loading / No Data */}
        {loading ? (
          <p className="text-center">⏳ Loading plans...</p>
        ) : plans.length === 0 ? (
          <div className="alert alert-info text-center">
            🚫 No plans available. Please create one.
          </div>
        ) : (
          <div className="row">
            {plans.map((plan) => (
              <div key={plan.id} className="col-md-4 mb-4">
                <div className="card shadow-lg border-0 h-100">
                  <div className="card-body text-center">
                    <h2 className="card-title fw-bold">{plan.name}</h2>
                    <h4 className="text-primary fw-bold">${plan.price}</h4>
                    <p className="text-muted small mb-2">
                      <strong>Plan Type:</strong> {plan.billingCycle}
                    </p>
                    <p className="text-muted">{plan.description}</p>
                    <ul className="list-unstyled mt-3 mb-4">
                      {plan.features.map((f, i) => (
                        <li key={i}>✅ {f.trim()}</li>
                      ))}
                    </ul>

                    {/* Request Plan Button */}
                    <button 
                      className="btn btn-primary w-100 fw-bold"
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
