import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import axiosInstance from "../Utilities/axiosInstance";

const UserProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosInstance.get("/category/getAllCategories");
        setCategories(res.data.data);
      } catch (error) {
        console.error("Category fetch error:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get("/product/getAllProducts");
        setProducts(res?.data?.data);
        setFilteredProducts(res.data.data);
      } catch (error) {
        console.error("Product fetch error:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = [...products];

    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product =>
        selectedCategories.includes(product.category_name)
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortOption === "az") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "za") {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortOption === "low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "high") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page on filter/search/sort
  }, [products, selectedCategories, searchTerm, sortOption]);

  const toggleCategory = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / pageSize);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div>
        <div className="container-fluid mt-2">
          <div className="row p-4">
            <div className="col-lg-3">
              <div className="card shadow-sm" style={{ borderRadius: '20px' }}>
                <div className="card-body">
                  <h2 className="h4 fw-semibold mb-4">Filter Products</h2>
                  <div className="mb-4">
                    <h3 className="h6 fw-semibold mb-3">Categories</h3>
                    {categories.map((category, index) => (
                      <div className="form-check mb-2" key={index}>
                        <input className="form-check-input"
                          type="checkbox"
                          checked={selectedCategories.includes(category.name)}
                          onChange={() => toggleCategory(category.name)}
                          id={`category${index}`}
                        />
                        <label className="form-check-label ms-2" htmlFor={`category${index}`}>
                          {category.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-9">
              <div className="row mb-4 g-3">
                <div className="col-md-8">
                  <div className="input-group">
                    <span className="input-group-text bg-white rounded-pill me-2">
                      <i className="bi bi-search text-muted"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control py-2 rounded-pill"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <select
                    className="form-select rounded-pill"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                  >
                    <option value="">Sort by</option>
                    <option value="az">Name: A to Z</option>
                    <option value="za">Name: Z to A</option>
                    <option value="low">Price: Low to High</option>
                    <option value="high">Price: High to Low</option>
                  </select>
                </div>
              </div>

              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {paginatedProducts?.length > 0 ? (
                  paginatedProducts.map((product, idx) => (
                    <div className="col" key={product.id}>
                      <Link to={`/UserProductDetail/${product.id}`} style={{ textDecoration: 'none' }}>
                        <div
                          className="card h-100 shadow-sm"
                          style={{
                            borderRadius: "20px",
                            transition: "all 0.3s",
                          }}
                        >
                          <div
                            className="card-img-top"
                            style={{
                              height: '14rem',
                              backgroundImage: `url('${product.image[0]}')`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                              borderTopLeftRadius: '20px',
                              borderTopRightRadius: '20px',
                            }}
                          />
                          <div
                            className="card-body d-flex flex-column"
                            style={{
                              backgroundColor: '#e3f2fd',
                              borderBottomLeftRadius: '20px',
                              borderBottomRightRadius: '20px',
                            }}
                          >
                            <span
                              className="px-3 py-1 mb-2"
                              style={{
                                backgroundColor: '#1976d2',
                                color: 'white',
                                borderRadius: '50px',
                                fontSize: '0.75rem',
                                display: 'inline-block',
                                fontWeight: '600'
                              }}
                            >
                              {product.category_name}
                            </span>

                            <h5 className="fw-bold mb-2 text-dark">
                              {product?.name?.slice(0, 60)}{product?.name?.length > 60 ? "..." : ""}
                            </h5>

                            <p className="text-muted mb-3 flex-grow-1" style={{ fontSize: '0.9rem' }}>
                              {product.description.length > 100
                                ? product.description.slice(0, 100) + "..."
                                : product.description}
                            </p>

                            <div className="d-flex justify-content-between align-items-center">
                              <span className="fw-bold text-primary">¥{product.price}</span>
                              <button
                                className="btn btn-sm"
                                style={{
                                  backgroundColor: '#64b5f6',
                                  color: 'white',
                                  borderRadius: '999px',
                                  padding: '5px 15px',
                                  fontSize: '0.8rem',
                                  fontWeight: '500'
                                }}
                              >
                                View
                              </button>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))
                ) : (
                  <p className="text-center"><Loader /></p>
                )}
              </div>

              {/* Pagination */}
              <div className="d-flex justify-content-between align-items-center mt-4 small text-muted">
                <div>
                  Showing {filteredProducts.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}
                  {" "}to{" "}
                  {Math.min(currentPage * pageSize, filteredProducts.length)}
                  {" "}of {filteredProducts.length} results
                </div>
                <div>
                  <nav>
                    <ul className="pagination pagination-sm mb-0">
                      <li className={`page-item${currentPage === 1 ? " disabled" : ""}`}>
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          Previous
                        </button>
                      </li>
                      {[...Array(totalPages)].map((_, i) => (
                        <li key={i} className={`page-item${currentPage === i + 1 ? " active" : ""}`}>
                          <button
                            className="page-link"
                            onClick={() => handlePageChange(i + 1)}
                          >
                            {i + 1}
                          </button>
                        </li>
                      ))}
                      <li className={`page-item${currentPage === totalPages ? " disabled" : ""}`}>
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        >
                          Next
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
              {/* End Pagination */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProducts;