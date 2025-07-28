import React from "react";
import "remixicon/fonts/remixicon.css"; // Ensure Remix Icon is available

const features = [
  {
    icon: "ri-truck-line",
    title: "Free Shipping",
    description: "On bulk orders over $500",
  },
  {
    icon: "ri-shield-check-line",
    title: "Money Back Guarantee",
    description: "30-day return policy",
  },
  {
    icon: "ri-customer-service-2-line",
    title: "24/7 Technical Support",
    description: "Expert electrician assistance",
  },
  {
    icon: "ri-secure-payment-line",
    title: "Secure Payment",
    description: "SSL encrypted transactions",
  },
];

const FeatureHighlights = () => {
  return (
    <section className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center text-2xl mb-4">
                <i className={`${feature.icon}`}></i>
              </div>
              <h5 className="text-lg font-semibold text-gray-800 mb-1">
                {feature.title}
              </h5>
              <p className="text-sm text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlights;
