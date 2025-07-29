import React from "react";
import "remixicon/fonts/remixicon.css";

const testimonials = [
  {
    name: "Michael Rodriguez",
    title: "Licensed Master Electrician",
    feedback:
      "Outstanding quality electrical supplies! I've been using ElectroSupply for all my commercial projects. Their THHN wire and circuit breakers are top-notch, and the bulk pricing saves me thousands on large installations.",
  },
  {
    name: "Sarah Chen",
    title: "Industrial Maintenance Supervisor",
    feedback:
      "Fast delivery and excellent customer service. When I needed specialized testing equipment for a critical project, their technical team helped me choose the right multimeter. Arrived next day as promised!",
  },
  {
    name: "David Thompson",
    title: "Electrical Contractor",
    feedback:
      "Been ordering from ElectroSupply for 3 years now. Their safety equipment is OSHA compliant and their prices beat local suppliers. The online ordering system makes restocking our warehouse effortless.",
  },
];

const CustomerTestimonials = () => {
  return (
    <section
      className="py-12"
      style={{
        background: "linear-gradient(to bottom right, #e6f3ff, #ffffff)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold " style={{color:"#0d47a1"}}>
            Our customers tell it better than we do!
          </h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-3xl shadow-md hover:shadow-xl transition duration-300 flex flex-col justify-between h-full relative"
              style={{ minHeight: "360px" }}
            >
              {/* Quote icon */}
              <i
                className="ri-double-quotes-l"
                style={{
                  position: "absolute",
                  top: "20px",
                  left: "20px",
                  fontSize: "24px",
                  color: "#dbeafe",
                }}
              ></i>

              <div className="mb-4 mt-4">
                {/* Star rating */}
                <div className="flex mb-3 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="ri-star-fill mr-1 text-lg" />
                  ))}
                </div>

                {/* Feedback */}
                <p className="text-gray-600 text-sm" style={{ lineHeight: "1.6" }}>
                  {testimonial.feedback}
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center mt-6">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-3"
                />
                <div>
                  <p className="font-semibold text-gray-800 mb-0">
                    {testimonial.name}
                  </p>
                  <p className="text-gray-500 text-sm">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerTestimonials;
