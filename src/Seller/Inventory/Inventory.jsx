import React, { useEffect, useState } from "react";
import axiosInstance from "../../Utilities/axiosInstance";
import { Modal, Button, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [inventory, setInventory] = useState([]);
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newStockQuantity, setNewStockQuantity] = useState("");

  useEffect(() => {
    fetchInventory();
  }, []);

  useEffect(() => {
    const filtered = inventory.filter(item =>
      item?.name?.toLowerCase()?.includes(searchTerm.toLowerCase())
    );
    setFilteredInventory(filtered);
  }, [searchTerm, inventory]);

  const fetchInventory = async () => {
    try {
      const response = await axiosInstance.get(`/product/getAllInventoryProducts`);
      console.log(response.data);
      setInventory(response.data.data || []);
      setFilteredInventory(response.data.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

const getStockStatus = (stock) => {
  if (stock > 15) return { label: "In Stock", badge: "success" };
  if (stock > 0 && stock <= 15) return { label: "Low Stock", badge: "warning" };
  if (stock === 0) return { label: "Out of Stock", badge: "danger" };
};


  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setNewStockQuantity("");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const handleUpdateStock = async () => {
    try {
      await axiosInstance.patch(`/product/updateProduct/${selectedProduct.id}`, {
        stockQuantity: parseInt(newStockQuantity)
      });
       toast.success("Inventory updated successfully!", {
        position: "top-right",
        autoClose: 1500,
      });
      handleCloseModal();
      fetchInventory();
    } catch (error) {
      console.error("Error updating stock:", error);
    }
  };

  return (
    <div className="p-4">
      <ToastContainer/>
      <div className="row align-items-center justify-content-between mb-3">
        <div className="col">
          <h2 className="h4 fw-bold mb-3">Inventory</h2>
        </div>
        <div className="col-auto">
          <input
            type="text"
            className="form-control form-control-sm rounded"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="table-responsive bg-white p-3">
        <table className="table align-middle mb-0">
          <thead className="text-muted small">
            <tr>
              <th>Item Name</th>
              <th>SKU</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredInventory.map((item, idx) => {
              const { label, badge } = getStockStatus(item.stockQuantity);

              return (
                <tr key={idx}>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <div
                        className="bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center"
                        style={{ width: "40px", height: "40px" }}
                      >
                        <i className="bi bi-box-seam fs-5"></i>
                      </div>
                      {item?.name?.split(" ").length > 4
                        ? item.name.split(" ").slice(0, 4).join(" ") + "..."
                        : item.name}
                    </div>
                  </td>
                  <td>{item.sku}</td>
                  <td>{item.category_name}</td>
                  <td>
                    <span className="fw-bold text-dark">{item.stockQuantity}</span>
                  </td>
                  <td>
                    <span
                      className={`badge bg-${badge}-subtle text-${badge} fw-semibold`}
                    >
                      {label}
                    </span>
                  </td>
                  <td>
                    {(badge === "warning" || badge === "danger") && (
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => handleOpenModal(item)}
                      >
                        Request Stock
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-3 small text-muted">
        <div>
          Showing 1 to {filteredInventory.length} of {filteredInventory.length} results
        </div>
      </div>

      {/* Stock Update Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Stock Quantity</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Product: <strong>{selectedProduct?.name}</strong>
          </p>
          <Form.Group>
            <Form.Label>New Stock Quantity</Form.Label>
            <Form.Control
              type="number"
              min="0"
              value={newStockQuantity}
              onChange={(e) => setNewStockQuantity(e.target.value)}
              placeholder="Enter new stock quantity"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleUpdateStock}
            disabled={!newStockQuantity}
          >
            Update Stock
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Inventory;
