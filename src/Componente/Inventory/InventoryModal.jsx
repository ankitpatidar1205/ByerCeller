import React from "react";

const InventoryModal = ({ isOpen, onClose, item, mode, onSave }) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newItem = {
      name: formData.get("name"),
      series: formData.get("series"),
      sku: formData.get("sku"),
      category: formData.get("category"),
      stock: parseInt(formData.get("stock")),
      price: formData.get("price"),
      warehouse: formData.get("warehouse"),
      status: formData.get("stock") > 0 ? "In Stock" : "Out of Stock",
      image: item?.image || "https://cdn-icons-png.flaticon.com/512/679/679821.png"
    };
    onSave(newItem, mode === "edit" ? item : null);
  };

  return (
    <div className="modal fade show" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {mode === "add" ? "Add New Item" : `Edit ${item?.name}`}
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Item Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="name"
                  defaultValue={mode === "edit" ? item?.name : ""}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Series</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="series"
                  defaultValue={mode === "edit" ? item?.series : ""}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">SKU</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="sku"
                  defaultValue={mode === "edit" ? item?.sku : ""}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Category</label>
                <select 
                  className="form-select" 
                  name="category"
                  defaultValue={mode === "edit" ? item?.category : ""}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Office Supplies">Office Supplies</option>
                  <option value="Furniture">Furniture</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Stock</label>
                <input 
                  type="number" 
                  className="form-control" 
                  name="stock"
                  min="0"
                  defaultValue={mode === "edit" ? item?.stock : ""}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Price</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="price"
                  defaultValue={mode === "edit" ? item?.price : ""}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Warehouse</label>
                <select 
                  className="form-select" 
                  name="warehouse"
                  defaultValue={mode === "edit" ? item?.warehouse : ""}
                  required
                >
                  <option value="">Select Warehouse</option>
                  <option value="Main Warehouse">Main Warehouse</option>
                  <option value="East Coast">East Coast</option>
                  <option value="West Coast">West Coast</option>
                </select>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={onClose}>
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  {mode === "add" ? "Add Item" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryModal;