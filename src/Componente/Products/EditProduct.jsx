import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../Utilities/axiosInstance';

const EditProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    sku: '',
    categoryId: '',
    quantity: '',
    description: '',
    image: null,
      modelNo: '',
  code: '',
  material: '',
  });

  useEffect(() => {
    fetchCategories();
    fetchProductById();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get('/category/getAllCategories');
      setCategories(res.data?.data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProductById = async () => {
    try {
      const res = await axiosInstance.get(`/product/getProductById/${id}`);
      const product = res.data?.data;

     setFormData({
  name: product.name || '',
  price: product.price || '',
  sku: product.sku || '',
  categoryId: product.categoryId || '',
  quantity: product.stockQuantity || '',
  description: product.description || '',
  image: null,
  modelNo: product.modelNo || '',
  code: product.code || '',
  material: product.material || '',
});

    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = new FormData();
      updatedData.append('name', formData.name);
      updatedData.append('price', formData.price);
      updatedData.append('sku', formData.sku);
      updatedData.append('categoryId', formData.categoryId); // Important
      updatedData.append('stockQuantity', formData.quantity); // Match backend key
      updatedData.append('description', formData.description);
updatedData.append('modelNo', formData.modelNo);
updatedData.append('code', formData.code);
updatedData.append('material', formData.material);

      if (formData.image) {
        updatedData.append('image', formData.image);
      }
      // Adjust the PUT endpoint if your backend is `/product/updateProduct/:id`
      await axiosInstance.patch(`/product/updateProduct/${id}`, updatedData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Product updated successfully!');
      navigate('/products');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product');
    }
  };

  return (
      <div className="card shadow-sm p-4">
    <form onSubmit={handleSubmit}>
       <div className="mb-4 text-center text-md-start">
        <h2 className="fw-bold">Edit Product</h2>
      </div>
      <div className="row mb-3">
        <div className="col">
          <label className="text-start d-block">Product Name *</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col">
          <label className="text-start d-block">Price ($) *</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col">
          <label className="text-start d-block">SKU *</label>
          <input
            type="text"
            className="form-control"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Category *</label>
          <select
            className="form-select"
            name="categoryId"
            value={formData.categoryId}
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
      value={formData.modelNo}
      onChange={handleChange}
    />
  </div>
  <div className="col-md-4">
    <label className="form-label">Code</label>
    <input
      type="text"
      className="form-control"
      name="code"
      value={formData.code}
      onChange={handleChange}
    />
  </div>
  <div className="col-md-4">
    <label className="form-label">Material</label>
    <input
      type="text"
      className="form-control"
      name="material"
      value={formData.material}
      onChange={handleChange}
    />
  </div>
</div>

      <div className="mb-3">
        <label className="text-start d-block">Stock Quantity *</label>
        <input
          type="number"
          className="form-control"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="text-start d-block">Description</label>
        <textarea
          className="form-control"
          name="description"
          rows="3"
          value={formData.description}
          onChange={handleChange}
        ></textarea>
      </div>

      <div className="mb-3">
        <label className="text-start d-block">Product Image</label>
        <input
          type="file"
          className="form-control"
          name="image"
          onChange={handleChange}
        />
      </div>

      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
          Cancel
        </button>
        <button type="submit" className="btn custom-button">
          Update Product
        </button>
      </div>
    </form>
     </div>
  );
};

export default EditProductForm;
