import React, { useState, useEffect } from "react";
import Footer from './Footer';
import CustomNavbar from './Navbar';
import { Link } from "react-router-dom";
import axiosInstance from "../Utilities/axiosInstance";
import Loader from "../Loader/Loader";

const ElectricalProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

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
  }, [products, selectedCategories, searchTerm, sortOption]);

  const toggleCategory = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <>
      <CustomNavbar />
      <div className="container-fluid mt-2">
        <div className="row p-lg-4 p-md-3 p-2">
          {/* Mobile Filter Button - Only visible on small screens */}
          <div className="d-lg-none d-flex mb-3">
            <button 
              className="btn btn-primary w-100 rounded-pill"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
            >
              {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>

          {/* Sidebar - Hidden on mobile unless toggled */}
          <div 
            className={`col-lg-3 ${showMobileFilters ? 'd-block' : 'd-none'} d-lg-block`}
            style={{ 
              top: "80px", 
              height: "fit-content",
              position: window.innerWidth >= 992 ? "sticky" : "static"
            }}
          >
            <div className="card shadow-sm mb-3" style={{ borderRadius: '20px' }}>
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

          {/* Main Content */}
          <div className="col-lg-9">
            {/* Search and Sort */}
            <div 
              className="row mb-4 g-3 position-sticky bg-white py-2 " 
              style={{ 
                top: "60px", 
                zIndex: 10,
                position: window.innerWidth >= 992 ? "sticky" : "static"
              }}
            >
              <div className="col-md-8 col-12">
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
              <div className="col-md-4 col-12">
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

            {/* Products Grid */}
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 g-4">
              {filteredProducts?.length > 0 ? (
                filteredProducts.map((product) => (
                  <div className="col" key={product.id}>
                    <Link to={`/productpage/${product.id}`} style={{ textDecoration: 'none' }}>
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
                <div className="col-12 text-center">
                  <Loader />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ElectricalProducts;