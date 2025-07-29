import React, { useEffect, useState } from "react";
import { FaSearch, FaTimes, FaEye, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import axiosInstance from "../Utilities/axiosInstance";

const UserProduct = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get(`/product/getAllProducts`);
      setProducts(response.data.data);
      setFilteredProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    const filtered = products.filter((product) =>
      product?.name?.toLowerCase()?.includes(searchTerm.toLowerCase().trim()) ||
      product?.sku?.toLowerCase()?.includes(searchTerm.toLowerCase().trim())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  const handleDeleteProduct = async () => {
    try {
      await axiosInstance.delete(`/product/deleteProduct/${deleteProduct}`);
      setDeleteProduct(null);
      fetchProducts(); // Refresh product list
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="container-fluid py-4 px-3 px-md-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h4 fw-bold mb-1">Product Management</h2>
          <p className="text-muted">View and manage all your products</p>
        </div>
      </div>

      {/* Search */}
      <div className="card mb-4 border-0 shadow-sm">
        <div className="card-body p-3">
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0">
              <FaSearch className="text-muted" />
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Search by name, ID or SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => setSearchTerm("")}
              >
                <FaTimes />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Products Grid View */}
      <div className="row">
        {filteredProducts?.length > 0 ? (
          filteredProducts.map((product, index) => (
            <div key={product.id} className="col-md-4 mb-4">
              <div className="card shadow-sm border-0 h-100">
                {product?.image && product.image.length > 0 ? (
                  <img
                    src={product.image[0]}
                    alt={product.name}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                ) : (
                  <div
                    className="d-flex align-items-center justify-content-center bg-light"
                    style={{ height: "200px" }}
                  >
                    <span className="text-muted">No Image</span>
                  </div>
                )}

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold">
                    {product?.name?.slice(0, 40)}
                    {product?.name?.length > 40 ? "..." : ""}
                  </h5>
                  <p className="text-primary fw-semibold mb-2">
                    ¥{product?.price}
                  </p>
                  <p className="text-muted small mb-1">
                    <strong>Model:</strong> {product?.modelNo || "N/A"}
                  </p>
                  <p className="text-muted small mb-3">
                    <strong>Material:</strong> {product?.material || "N/A"}
                  </p>

                  <div className="mt-auto d-flex justify-content-between">
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      data-bs-toggle="modal"
                      data-bs-target="#productDetailModal"
                      onClick={() => setSelectedProduct(product)} >
                      <FaEye /> 
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-5">
            <FaSearch size={48} className="text-muted mb-3" />
            <h5 className="fw-semibold">No products found</h5>
            <p className="text-muted">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      {/* View Product Modal */}
      <div
        className="modal fade"
        id="productDetailModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header border-0 pb-0">
              <h5 className="modal-title fw-bold">Product Details</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              />
            </div>
            <div className="modal-body pt-0">
              {selectedProduct && (
                <div className="row g-4">
                  <div className="col-12">
                    <h6 className="fw-bold">Images:</h6>
                    <div className="d-flex flex-wrap gap-3">
                      {selectedProduct.image &&
                      selectedProduct.image.length > 0 ? (
                        selectedProduct.image.map((imgUrl, index) => (
                          <img
                            key={index}
                            src={imgUrl}
                            alt={`Product ${index + 1}`}
                            className="img-thumbnail"
                            style={{
                              width: "120px",
                              height: "120px",
                              objectFit: "cover",
                            }}
                          />
                        ))
                      ) : (
                        <span className="text-muted">
                          No Images Available
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="col-12">
                    <h4 className="fw-bold mt-4">{selectedProduct.name}</h4>
                    <p>
                      <strong>ID:</strong> {selectedProduct.id}
                    </p>
                    <p>
                      <strong>Price:</strong> ¥{selectedProduct.price}
                    </p>
                     <p><strong>Code:</strong> {selectedProduct.code || "N/A"}</p>
                      <p><strong>Model No:</strong> {selectedProduct.modelNo || "N/A"}</p>
                    <p><strong>Material:</strong> {selectedProduct.material || "N/A"}</p>
                    <p>
                      <strong>Stock:</strong>{" "}
                      {selectedProduct.stockQuantity}
                    </p>
                    <p>
                      <strong>Category:</strong>{" "}
                      {selectedProduct.category_name || "N/A"}
                    </p>
                    <p>
                      <strong>Description:</strong>{" "}
                      {selectedProduct.description || "N/A"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      <div
        className="modal fade"
        id="deleteProductModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0">
            <div className="modal-body text-center p-4">
              <FaTrash size={32} className="text-danger mb-3" />
              <h4 className="fw-bold mb-3">Delete Product?</h4>
              <p className="text-muted mb-4">
                This action cannot be undone.
              </p>
              <div className="d-flex justify-content-center gap-3">
                <button
                  className="btn btn-outline-secondary px-4"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  className="btn btn-danger px-4"
                  onClick={handleDeleteProduct}
                  data-bs-dismiss="modal"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProduct;
