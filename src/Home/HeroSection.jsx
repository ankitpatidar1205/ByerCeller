import React, { useEffect, useState } from "react";
import axiosInstance from "../Utilities/axiosInstance";
import "./HeroSection.css"; // Optional for custom styles
import { Link } from "react-router-dom";

const HeroSection = () => {
  const [bannerImages, setBannerImages] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axiosInstance.get("/banner/getAllBanners");
        if (response.data.success) {
          const images = response?.data?.data?.map((b) => b.image[0]);
          setBannerImages(images);
        }
      } catch (err) {
        console.error("Error fetching banners:", err);
      }
    };

    fetchBanners();
  }, []);

  if (bannerImages.length === 0) return null;

  return (
    <div className="container my-4">
     <Link to="/electricalproducts" >
      <div
        id="heroCarousel"
        className="carousel slide carousel-fade rounded-4 overflow-hidden position-relative"
        data-bs-ride="carousel"
        data-bs-interval="2000"
        data-bs-pause="false" // ✅ force auto-scroll on desktop too
      >
        {/* Indicators */}
        <div className="carousel-indicators mb-0">
          {bannerImages.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#heroCarousel"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-current={index === 0 ? "true" : undefined}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>

        {/* Slides */}
        <div className="carousel-inner">
          {bannerImages.map((imgUrl, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <img
                src={imgUrl}
                className="d-block w-100 img-fluid"
                alt={`Banner ${index + 1}`}
              />
            </div>
          ))}
        </div>

        {/* Mobile arrows */}
        <button
          className="carousel-control-prev d-md-none"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        </button>
        <button
          className="carousel-control-next d-md-none"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
        </button>
      </div>
     </Link>
      </div>
  
  );
};

export default HeroSection;
