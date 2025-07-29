import React, { useEffect, useState } from "react";
import axios from "axios";

const UpdateMarkupPrice = () => {
  const [products, setProducts] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [markupPrice, setMarkupPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // Fetch all products on mount
  useEffect(() => {
    axios.get("/product/getAllProducts")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Failed to fetch products", err));
  }, []);

  const handleSelect = (e) => {
    const id = e.target.value;
    setSelectedId(id);
    const product = products.find(p => p.product_id === parseInt(id));
    setMarkupPrice(product?.markupPrice || "");
    setMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedId || markupPrice === "") {
      return setMessage({ type: "danger", text: "Please select a product and enter markup price." });
    }

    try {
      setLoading(true);
      await axios.put(`/product/updateMarkup/${selectedId}`, { markupPrice });
      setMessage({ type: "success", text: "Markup price updated successfully!" });
    } catch (err) {
      setMessage({ type: "danger", text: "Failed to update markup price." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <h4 className="fw-bold mb-3">Update Markup Price</h4>

      {message && (
        <div className={`alert alert-${message.type}`} role="alert">
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="productSelect" className="form-label">Select Product</label>
          <select
            id="productSelect"
            className="form-select"
            value={selectedId}
            onChange={handleSelect}
          >
            <option value="">-- Select a product --</option>
            {products.map((product) => (
              <option key={product.product_id} value={product.product_id}>
                {product.product_name} (#{product.product_code})
              </option>
            ))}
          </select>
        </div>

        {selectedId && (
          <div className="mb-3">
            <label htmlFor="markupPrice" className="form-label">Markup Price (USD)</label>
            <input
              type="number"
              className="form-control"
              id="markupPrice"
              value={markupPrice}
              onChange={(e) => setMarkupPrice(e.target.value)}
              required
            />
          </div>
        )}

        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Markup"}
        </button>
      </form>
    </div>
  );
};

export default UpdateMarkupPrice;
