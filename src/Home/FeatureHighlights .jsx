import React from "react";
import "remixicon/fonts/remixicon.css"; // Ensure Remix Icon is available

const features = [
  {
    icon: "ri-user-shared-line",
    title: "Easy Buyer-Seller Match",
    description: "Connect with verified suppliers or clients instantly.",
  },
  {
    icon: "ri-pie-chart-2-line",
    title: "Real-time Analytics",
    description: "Track lead conversions and deal performance live.",
  },
  {
    icon: "ri-service-line",
    title: "24/7 CRM Support",
    description: "Get instant help for onboarding and issue resolution.",
  },
  {
    icon: "ri-lock-2-line",
    title: "Secure Transactions",
    description: "End-to-end encrypted interactions & payments.",
  },
];

const FeatureHighlights = () => {
  return (
    <section
      className="py-12 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "#f0f7ff" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-10">
          <h2
            className="fw-bold"
            style={{
              fontSize: "2rem",
              color: "#0d47a1",
              marginBottom: "0.5rem",
            }}
          >
            Why Choose Us?
          </h2>
          <p style={{ color: "#6b7280", fontSize: "1rem" }}>
            Our platform offers best-in-class features for both buyers and sellers.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-3xl shadow-sm hover:shadow-lg transition p-6"
              style={{
                background: "linear-gradient(to bottom right, #e6f3ff, #ffffff)",
                border: "1px solid #d6eaff",
                height: "100%",
              }}
            >
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  backgroundColor: "#d6eaff",
                  color: "#007bff",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "26px",
                  margin: "0 auto 16px auto",
                }}
              >
                <i className={feature.icon}></i>
              </div>
              <h5
                style={{
                  fontSize: "1.125rem",
                  fontWeight: "600",
                  color: "#1f2937",
                  marginBottom: "8px",
                }}
              >
                {feature.title}
              </h5>
              <p style={{ fontSize: "0.9rem", color: "#6b7280" }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlights;
