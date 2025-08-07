import React, { useState, useEffect } from 'react';
import axiosInstance from '../../Utilities/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SAddProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: '',
    price: '',
    sku: '',
    categoryId: '',
    stockQuantity: '',
    description: '',
    image: [],
    modelNo: '',
    code: '',
    material: '',
  });

  useEffect(() => {
    fetchCategories();
  }, []);
  // Get sellerId from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const sellerId = user.id;

  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get(`/category/getAllCategories`);
      setCategories(res.data?.data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setForm({ ...form, image: Array.from(files) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('price', form.price);
    formData.append('sku', form.sku);
    formData.append('categoryId', form.categoryId);
    formData.append('stockQuantity', form.stockQuantity);
    formData.append('description', form.description);
    formData.append('modelNo', form.modelNo);
    formData.append('code', form.code);
    formData.append('sellerId', sellerId);
    formData.append('material', form.material);
 
    form.image.forEach((image) => {
      formData.append('image', image);
    });

    try {
      const response = await axiosInstance.post(`/product/createProduct`, formData);
      toast.success('Product successfully added!', {
        position: 'top-center',
        autoClose: 2000,
      });
      setTimeout(() => navigate('/seller/products'), 2000); // wait for toast before redirect
    } catch (error) {
      console.error('Error creating product:', error);
      toast.error('Error creating product', {
        position: 'top-center',
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="p-5">
      <ToastContainer />
      <div className="mb-4 text-center text-md-start">
        <h2 className="fw-bold">Add New Product</h2>
      </div>

      <div className="card shadow-sm p-4">
        <h4 className="mb-4">Product Details</h4>
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Product Name *</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Price ($) *</label>
              <input
                type="number"
                className="form-control"
                name="price"
                value={form.price}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">SKU *</label>
              <input
                type="text"
                className="form-control"
                name="sku"
                value={form.sku}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Category *</label>
              <select
                className="form-select"
                name="categoryId"
                value={form.categoryId}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
<div className="row mb-3">
  <div className="col-md-4">
    <label className="form-label">Model No</label>
    <input
      type="text"
      className="form-control"
      name="modelNo"
      value={form.modelNo}
      onChange={handleChange}
    />
  </div>
  <div className="col-md-4">
    <label className="form-label">Code</label>
    <input
      type="text"
      className="form-control"
      name="code"
      value={form.code}
      onChange={handleChange}
    />
  </div>
  <div className="col-md-4">
    <label className="form-label">Material</label>
    <input
      type="text"
      className="form-control"
      name="material"
      value={form.material}
      onChange={handleChange}
    />
  </div>
</div>

          <div className="mb-3">
            <label className="form-label">Stock Quantity *</label>
            <input
              type="number"
              className="form-control"
              name="stockQuantity"
              value={form.stockQuantity}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              name="description"
              rows="3"
              value={form.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="form-label">Product Images</label>
            <input
              type="file"
              className="form-control"
              name="image"
              accept="image/*"
              multiple
              onChange={handleChange}
            />
            <div className="text-muted mt-2">
              You can upload multiple JPG, PNG, or GIF files (up to 5MB each)
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2">
            <button type="button" className="btn btn-outline-secondary" onClick={()=> navigate(-1)}>
              Cancel
            </button>
            <button type="submit" className="btn custom-button">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SAddProduct;
