import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const ContactUs = () => {
  return (
    <>
    <Navbar/>
    <div className="bg-gray-50 min-h-screen flex items-center justify-center py-10 px-4">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white rounded-2xl shadow-lg overflow-hidden">

        {/* Left Side: Image + Info */}
        <div className="flex flex-col justify-between p-6">
          <img
            src="https://i.ibb.co/ZRj5hPvf/cover-removebg-preview.png"
            alt="Office Building"
            className="rounded-lg mb-6 object-cover w-full h-80"
          />

          <div>
            <h2 className="text-2xl font-bold mb-2">We’d Love to Hear From You.</h2>
            <p className="text-gray-600 mb-4">
              Or just reach out manually to{" "}
              <a href="mailto:hello@example.com" className="text-blue-600">
                hello@example.com
              </a>
            </p>

            <div className="space-y-4">
              <div>
                <p className="font-semibold">Email Support</p>
                <p className="text-gray-600">hello@example.com</p>
              </div>
              <div>
                <p className="font-semibold">Visit Our Office</p>
                <p className="text-gray-600">2289 Elm Street, New York, NY</p>
              </div>
              <div>
                <p className="font-semibold">Call Us Directly</p>
                <p className="text-gray-600">+1 234 4567 789</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="p-6 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-6">Let’s Get In Touch</h2>

          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                className="w-full border p-3 rounded focus:outline-none focus:ring"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-full border p-3 rounded focus:outline-none focus:ring"
              />
            </div>

            <input
              type="email"
              placeholder="Email Address"
              className="w-full border p-3 rounded focus:outline-none focus:ring"
            />

            <input
              type="tel"
              placeholder="+44 (000) 000-0000"
              className="w-full border p-3 rounded focus:outline-none focus:ring"
            />

            <textarea
              rows="4"
              placeholder="Enter your message here..."
              className="w-full border p-3 rounded focus:outline-none focus:ring"
            ></textarea>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Submit Form →
            </button>
          </form>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default ContactUs;
