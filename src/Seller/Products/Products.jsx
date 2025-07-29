import React, { useEffect, useState } from "react";
import { FaFilePdf, FaPlusCircle, FaEye, FaEdit, FaTrash, FaSearch, FaTimes, } from "react-icons/fa";
import { Link } from "react-router-dom";
import axiosInstance from "../../Utilities/axiosInstance";
const SellerProductes = () => {
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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h4 fw-bold mb-1">Product Management</h2>
          <p className="text-muted">View and manage all your products</p>
        </div>
        <div className="d-flex gap-2 flex-wrap">
          {/* <button className="btn btn-outline-danger d-flex align-items-center gap-1">
            <FaFilePdf />
            <span>Export PDF</span>
          </button> */}
          <Link to="/seller/addproducts">
            <button className="btn btn-primary d-flex align-items-center gap-2">
              <FaPlusCircle />
              <span>Add Product</span>
            </button>
          </Link>
        </div>
      </div>

      <div className="card mb-4 border-0 shadow-sm">
        <div className="card-body p-3">
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0">
              <FaSearch className="text-muted" />
            </span>
            <input   type="text"   className="form-control border-start-0"   placeholder="Search by name, ID or SKU..."
              value={searchTerm}   onChange={(e) => setSearchTerm(e.target.value)}  />
            {searchTerm && (
              <button   className="btn btn-outline-secondary"   type="button"   onClick={() => setSearchTerm("")} >
                <FaTimes />
              </button>
            )}
          </div>
        </div>
      </div>

   <div className="card shadow-sm border-0">
  <div className="card-body">
    <h5 className="card-title mb-3">Products</h5>
    <div className="table-responsive">
      <table className="table table-bordered table-hover align-middle text-nowrap mb-0">
        <thead className="table-light">
          <tr>
            <th className="py-3 ps-4">SL</th>
            <th className="py-3">PRODUCT NAME</th>
            <th className="py-3">PRICE</th>
            <th className="py-3">Model No</th>
            <th className="py-3">Material</th>
            <th className="py-3">IMAGE</th>
            <th className="py-3 pe-4 text-end">ACTIONS</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {filteredProducts?.length > 0 ? (
            filteredProducts?.map((product, index) => (
              <tr key={product.id}>
                <td className="ps-4 fw-semibold">{index + 1}</td>
              <td>{product?.name?.slice(0, 40)}{product?.name?.length > 100 ? "..." : ""}</td>

                <td>${product?.price}</td>
                <td>{product?.modelNo}</td>
                <td>{product?.material || "N/A"}</td>
                <td>
                  {product?.image && product.image.length > 0 ? (
                    <img src={product.image[0]}  alt="Product"  style={{ width: "60px", height: "60px", objectFit: "cover", }}
                      className="rounded border" />
                  ) : (
                    <span className="text-muted">No Image</span>
                  )}
                </td>
                <td className="pe-4 text-end">
                  <div className="d-flex justify-content-end gap-2">
                    <button className="btn btn-sm btn-outline-secondary"
                      data-bs-toggle="modal"
                      data-bs-target="#productDetailModal"
                      onClick={() => setSelectedProduct(product)}
                      title="View Details" >
                      <FaEye size={14} />
                    </button>
                <Link to={`/seller/editproduct/${product.id}`} className="btn btn-sm btn-outline-primary">
  <FaEdit size={14} />
</Link>

                   
                          <button  className="btn btn-sm btn-outline-danger"  data-bs-toggle="modal"
                            data-bs-target="#deleteProductModal" onClick={() => setDeleteProduct(product.id)}  title="Delete" >
                            <FaTrash size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-5">
                      <FaSearch size={48} className="text-muted mb-3" />
                      <h5 className="fw-semibold">No products found</h5>
                      <p className="text-muted">Try adjusting your search or filter criteria</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>


      {/* View Product Modal */}
      <div className="modal fade" id="productDetailModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header border-0 pb-0">
              <h5 className="modal-title fw-bold">Product Details</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" />
            </div>
            <div className="modal-body pt-0">
              {selectedProduct && (
                <div className="row g-4">
                  {/* Image Section */}
                  <div className="col-12">
                    <h6 className="fw-bold">Images:</h6>
                    <div className="d-flex flex-wrap gap-3">
                      {selectedProduct.image && selectedProduct.image.length > 0 ? (
                        selectedProduct.image.map((imgUrl, index) => (
                          <img
                            key={index}
                            src={imgUrl}
                            alt={`Product ${index + 1}`}
                            className="img-thumbnail"
                            style={{ width: "120px", height: "120px", objectFit: "cover" }}
                          />
                        ))
                      ) : (
                        <span className="text-muted">No Images Available</span>
                      )}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="col-12">
                    <h4 className="fw-bold mt-4">{selectedProduct.name}</h4>
                    <p><strong>ID:</strong> {selectedProduct.id}</p>
                    <p><strong>Price:</strong> ${selectedProduct.price}</p>
                    <p><strong>Stock:</strong> {selectedProduct.stockQuantity}</p>
                    <p><strong>Category:</strong> {selectedProduct.category_name || "N/A"}</p>
                    <p><strong>Description:</strong> {selectedProduct.description || "N/A"}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      <div className="modal fade" id="deleteProductModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0">
            <div className="modal-body text-center p-4">
              <FaTrash size={32} className="text-danger mb-3" />
              <h4 className="fw-bold mb-3">Delete Product?</h4>
              <p className="text-muted mb-4">This action cannot be undone.</p>
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

export default SellerProductes;
