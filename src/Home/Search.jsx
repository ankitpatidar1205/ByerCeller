import React, { useEffect, useState } from "react";
import axiosInstance from "../Utilities/axiosInstance";
import { Link } from "react-router-dom";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔽 Fetch all products once on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get("/product/getAllProducts");
        setProducts(res?.data?.data || []);
        setError("");
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Something went wrong. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // 🔽 Filter products when search term changes
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFiltered([]);
      return;
    }

    const results = products.filter((item) =>
      item?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFiltered(results);
  }, [searchTerm, products]);

  return (
    <div className="relative w-full max-w-xs">
      <input
        type="text"
        placeholder="Search for products..."
        className="px-4 py-1.5 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-sm"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {searchTerm && (
        <div className="absolute z-50 bg-white border mt-2 rounded-md shadow-lg w-full max-h-60 overflow-auto">
          {loading ? (
            <div className="p-4 text-center text-gray-500 text-sm">Loading...</div>
          ) : error ? (
            <div className="p-4 text-center text-red-500 text-sm">{error}</div>
          ) : filtered.length > 0 ? (
            filtered.map((product) => (
              <Link
                to={`/productpage/${product.id}`}
                key={product._id}
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 border-b last:border-b-0"
                onClick={() => setSearchTerm("")}
              >
                <img
                  src={product.image || "https://via.placeholder.com/40"}
                  alt={product.name}
                  className="w-10 h-10 rounded object-cover"
                />
                <span className="text-sm text-gray-800">{product.name}</span>
              </Link>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500 text-sm">
              🔍 No search results found.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
