import React, { useEffect, useState } from "react";
import { FaEye, FaSearch, FaTimes } from "react-icons/fa";
import axiosInstance from "../../Utilities/axiosInstance";

const BrokerProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchBrokerProducts();
  }, []);

  const fetchBrokerProducts = async () => {
    try {
      const res = await axiosInstance.get("/product/getAllProducts");
      const updatedProducts = res.data.data.map((product) => ({
        ...product,
        markup: 20, // Default markup percentage
      }));
      setProducts(updatedProducts);
    } catch (err) {
      console.error("Error fetching broker products:", err);
    }
  };

  const filteredProducts = products.filter((product) =>
    product?.name?.toLowerCase()?.includes(searchTerm.toLowerCase().trim())
  );
const calculateFinalPrice = (price, markup) => {
  const numericPrice = parseFloat(price);
  const numericMarkup = parseFloat(markup);

  if (isNaN(numericPrice) || isNaN(numericMarkup)) return "N/A";

  return (numericPrice + numericPrice * (numericMarkup / 100)).toFixed(2);
};


  const handleClearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className="container-fluid p-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h4 fw-bold mb-0">Broker Product Listings</h2>
        <div className="input-group w-25">
          <input
            type="text"
            className="form-control"
            placeholder="Search by product name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              className="btn btn-outline-secondary"
              onClick={handleClearSearch}
              title="Clear"
            >
              <FaTimes />
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>SL</th>
              <th>Product Name</th>
              <th>Seller Price (¥)</th>
              <th>Markup (%)</th>
              <th>Final Price (¥)</th>
              <th>Model No</th>
              <th>Material</th>
              <th>Image</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts?.length > 0 ? (
              filteredProducts.map((product, index) => (
                <tr key={product.id || index}>
                  <td>{index + 1}</td>
                  <td>{product.name?.slice(0, 40)}</td>
                  <td>{Number(product.price || 0).toFixed(2)}</td>
                  <td>{product.markup}%</td>
                  <td>	{calculateFinalPrice(product.price, product.markup)}</td>
                  <td>{product.modelNo || "N/A"}</td>
                  <td>{product.material || "N/A"}</td>
                  <td>
                    {product.image?.length > 0 ? (
                      <img
                        src={product.image[0]}
                        alt="product"
                        style={{ width: "50px", height: "50px", objectFit: "cover" }}
                      />
                    ) : (
                      <span className="text-muted">No Image</span>
                    )}
                  </td>
                  <td className="text-end">
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      title="View"
                    >
                      <FaEye />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center text-muted">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BrokerProducts;
