import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../Utilities/axiosInstance";

const RelatedProducts = ({ categoryId, currentProductId }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/product/getAllProducts");
        const allProducts = response.data.data;

        const filtered = allProducts.filter(
          (product) =>
            product.categoryId === categoryId &&
            product.id !== currentProductId
        );

        setRelatedProducts(filtered);
      } catch (error) {
        console.error("Error fetching related products:", error);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchRelated();
    }
  }, [categoryId, currentProductId]);

  return (
    <div className="container my-5">
      <h4 className="mb-4 fw-bold border-bottom pb-2">Related Products</h4>

      <div className="row">
        {(loading ? Array.from({ length: 4 }) : relatedProducts).map(
          (product, index) => (
            <div key={index} className="col-12 col-sm-6 col-lg-3 mb-4 d-flex">
              <div
                className="card shadow-sm w-100 d-flex flex-column"
                style={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  transition: "transform 0.3s ease",
                }}
              >
                {/* Image Section */}
                <div
                  className={`card-img-top`}
                  style={{
                    backgroundImage: loading
                      ? "none"
                      : `url(${product?.image?.[0] || "https://via.placeholder.com/300"})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "200px",
                    backgroundColor: "#f0f0f0",
                  }}
                ></div>

                {/* Body Section */}
                <div className="card-body d-flex flex-column">
                  {/* Badge */}
                  <div className="mb-2">
                    <span className="badge text-bg-primary bg-gradient px-3 py-1 rounded-pill">
                      {loading ? "..." : product?.category_name || "Category"}
                    </span>
                  </div>

                  {/* Title */}
                  <h5 className="card-title mb-2 text-dark fw-semibold">
                    {loading ? (
                      <div className="placeholder-glow">
                        <span className="placeholder col-8"></span>
                      </div>
                    ) : (
                      product.name
                    )}
                  </h5>

                  {/* Description */}
                  <p className="card-text text-muted small mb-3">
                    {loading ? (
                      <div className="placeholder-glow">
                        <span className="placeholder col-12 mb-1"></span>
                        <span className="placeholder col-10"></span>
                      </div>
                    ) : product?.description?.length > 60 ? (
                      `${product.description.substring(0, 60)}...`
                    ) : (
                      product.description
                    )}
                  </p>

                  {/* Price + Button */}
                  <div className="mt-auto d-flex justify-content-between align-items-center">
                    <span className="text-primary fw-bold">
                      {loading ? "₹..." : `₹${product.price}`}
                    </span>
                    {loading ? (
                      <div className="placeholder-glow w-50">
                        <span className="placeholder btn btn-primary btn-sm rounded-pill col-12"></span>
                      </div>
                    ) : (
                      <Link
                        to={`/productpage/${product.id}`}
                        className="btn btn-sm btn-primary rounded-pill"
                      >
                        View
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        )}

        {!loading && relatedProducts.length === 0 && (
          <div className="col-12">
            <div className="alert alert-info text-center">
              No related products found.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RelatedProducts;
