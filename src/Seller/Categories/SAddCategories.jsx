import React, { useState, useEffect } from 'react';
import axiosInstance from '../../Utilities/axiosInstance';
import { FaEdit, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SAddCategories = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [categoryImage, setCategoryImage] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Get sellerId from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const sellerId = user.id;

  // Fetch all categories and filter by sellerId
const fetchCategories = async () => {
  try {
    const res = await axiosInstance.get(`/category/getAllCategories`);
    const allCategories = res.data?.data || [];

    // ensure both IDs are compared as strings
    const sellerCategories = allCategories.filter(
      (cat) => String(cat.sellerId) === String(sellerId)
    );

    setCategories(sellerCategories);
    setFilteredCategories(sellerCategories);

  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};


  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle search
  useEffect(() => {
    const filtered = categories.filter((cat) =>
      cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCategories(filtered);
    setCurrentPage(1); // Reset to first page on search
  }, [searchTerm, categories]);

  const resetForm = () => {
    setCategoryName('');
    setCategoryImage(null);
    setEditingCategory(null);
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();

    if (!categoryName) {
      toast.error('Please enter category name');
      return;
    }

    const formData = new FormData();
    formData.append('name', categoryName);
    formData.append('sellerId', sellerId);
    if (categoryImage) formData.append('image', categoryImage);

    try {
      if (editingCategory) {
        await axiosInstance.patch(`/category/updateCategory/${editingCategory.id}`, formData);
        toast.success('Category updated successfully!');
      } else {
        await axiosInstance.post(`/category/createCategory`, formData);
        toast.success('Category added successfully!');
      }
      setShowModal(false);
      resetForm();
      fetchCategories();
    } catch (err) {
      toast.error('Error saving category');
      console.error('Error saving category:', err);
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setCategoryName(category.name);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;

    try {
      await axiosInstance.delete(`/category/deleteCategory/${id}`);
      toast.success('Category deleted successfully!');
      fetchCategories();
    } catch (err) {
      toast.error('Error deleting category');
      console.error('Error deleting category:', err);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredCategories.length / pageSize);
  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container py-4">
      <ToastContainer />
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="fw-bold">Categories</h3>
        <button className="btn custom-button" onClick={() => { resetForm(); setShowModal(true); }}>
          Add Category
        </button>
      </div>

      {/* Search Input */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Category Table */}
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <h5 className="card-title mb-3">Categories</h5>
          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle text-nowrap mb-0">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Category Name</th>
                  <th>Image</th>
                  <th style={{ width: '180px' }}>Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {paginatedCategories.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center text-muted py-4">
                      No Category Found
                    </td>
                  </tr>
                ) : (
                  paginatedCategories.map((cat, index) => (
                    <tr key={cat._id || index}>
                      <td>{(currentPage - 1) * pageSize + index + 1}</td>
                      <td className="fw-semibold">{cat.name}</td>
                      <td>
                        <img
                          src={cat.image}
                          alt={cat.name}
                          style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                          className="rounded border"
                        />
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => handleEdit(cat)}
                        >
                          <FaEdit size={14} />
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(cat.id)}
                        >
                          <FaTrash size={14} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="d-flex justify-content-between align-items-center mt-3 small text-muted">
            <div>
              Showing {filteredCategories.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}
              {" "}to{" "}
              {Math.min(currentPage * pageSize, filteredCategories.length)}
              {" "}of {filteredCategories.length} results
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
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <>
          <div className="modal show fade d-block" tabIndex="-1">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <form onSubmit={handleAddOrUpdate}>
                  <div className="modal-header">
                    <h5 className="modal-title">
                      {editingCategory ? 'Edit Category' : 'Add New Category'}
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => { setShowModal(false); resetForm(); }}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label">Category Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={categoryName}
                          onChange={(e) => setCategoryName(e.target.value)}
                          placeholder="Enter category name"
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Category Image</label>
                        <input
                          type="file"
                          className="form-control"
                          onChange={(e) => setCategoryImage(e.target.files[0])}
                          accept="image/*"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => { setShowModal(false); resetForm(); }}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn custom-button">
                      {editingCategory ? 'Update' : 'Add'} Category
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
  );
};

export default SAddCategories;