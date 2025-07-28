import React from "react";

const SubscribeSection = () => {
  return (
    <section className="py-12 bg-blue-50 text-center">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-4">
          Subscribe for Exclusive Electrical Deals
        </h2>
        <p className="text-blue-800/80 text-base sm:text-lg mb-6">
          Get professional updates, inventory alerts, and contractor discounts
          delivered to your inbox.
        </p>

        <form className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full sm:w-auto px-5 py-3 rounded-full border border-blue-300 focus:ring-2 focus:ring-blue-400 text-blue-900 text-sm"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-blue-700 transition"
          >
            Subscribe Now
          </button>
        </form>

        <p className="text-blue-800/70 text-sm">
          Join 15,000+ electrical professionals getting exclusive deals.
        </p>
      </div>
    </section>
  );
};

export default SubscribeSection;
