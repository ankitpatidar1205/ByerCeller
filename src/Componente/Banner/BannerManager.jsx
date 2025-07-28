import React, { useEffect, useState } from "react";
import { FaTrash, FaUpload } from "react-icons/fa";
import axiosInstance from "../../Utilities/axiosInstance";

const BannerManager = () => {
  const [banners, setBanners] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axiosInstance.get(`/banner/getAllBanners`);
        if (response.data.success) {
          const formattedData = response.data.data.map((banner) => ({
            id: banner.id,
            image: banner.image[0],
          }));
          setBanners(formattedData);
        }
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };
    fetchBanners();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this banner?")) {
      return;
    }
    try {
      await axiosInstance.delete(`/banner/deleteBanner/${id}`);
      setBanners(banners.filter((banner) => banner.id !== id));
      alert("Banner deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete banner. Please try again.");
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      setUploading(true);
      const response = await axiosInstance.post(`/banner/createBanner`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        alert("Banner uploaded successfully!");
        setSelectedFile(null);
        setBanners((prev) => [
          ...prev,
          { id: response.data.data.id, image: response.data.data.image[0] },
        ]);
      } else {
        alert("Upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("An error occurred during upload.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center mb-5">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-sm p-4">
            <h4 className="text-center mb-4">Upload New Banner</h4>
            <form onSubmit={handleUpload}>
              <div className="mb-3">
                <input
                  type="file"
                  className="form-control"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary w-100 d-flex align-items-center justify-content-center"
                disabled={uploading}
              >
                <FaUpload className="me-2" />
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card shadow-sm p-4">
            <h5 className="mb-3">Uploaded Banners</h5>
            <div className="table-responsive">
              <table className="table table-hover align-middle text-center">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {banners.length > 0 ? (
                    banners.map((banner, index) => (
                      <tr key={banner.id}>
                        <td>{index + 1}</td>
                        <td>
                          <img
                            src={banner.image}
                            alt={`Banner ${banner.id}`}
                            className="img-thumbnail"
                            style={{ maxWidth: "150px" }}
                          />
                        </td>
                        <td>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleDelete(banner.id)}
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-muted">
                        No banners uploaded yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerManager;
