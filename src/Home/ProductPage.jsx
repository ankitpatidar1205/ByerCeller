import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import CustomNavbar from './Navbar';
import axiosInstance from '../Utilities/axiosInstance';
import { useNavigate, useParams } from 'react-router-dom';
import RelatedProducts from './ProductDetails';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../Loader/Loader';

const ProductPage = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    setQuantity(value > 0 ? value : 1);
  };

  useEffect(() => {
    const fetchProductById = async () => {
      try {
        const res = await axiosInstance.get(`/product/getProductById/${id}`);
        const data = res.data?.data;
        setProduct(data);
        if (data?.image?.length > 0) {
          setSelectedImage(data.image[0]);
        }
      } catch (error) {
        console.error('Error fetching product by ID:', error);
      }
    };
    fetchProductById();
  }, [id]);

  if (!product) return <div className="text-center p-5"><Loader /></div>;

  const addtocart = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;

    if (!userId) {
      toast.error("Please log in first to add this product to your cart.", {
        position: "top-center",
        autoClose: 1000,
      });
      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    try {
      const response = await axiosInstance.post("/cart/addToCart", {
        userId: parseInt(userId),
        productId: product.id,
        price: parseFloat(product.price * quantity),
        quantity: quantity.toString(),
      });

      if (response.status === 200) {
        toast.info("Product added to cart!", {
          position: "top-center",
          autoClose: 1000,
        });
      }
    } catch (error) {
      if (error.response?.status === 409) {
        toast.info("Product is already in the cart.", {
          position: "top-center",
          autoClose: 1000,
        });
      } else {
        toast.error("Failed to add to cart.", {
          position: "top-center",
          autoClose: 1000,
        });
      }
      console.error("Add to cart error:", error);
    }
  };

  return (
    <>
      <ToastContainer />
      <CustomNavbar />
      <div className="bg-white">
        <div className="container py-5 mt-4">
          <div className="row g-4">
            {/* Product Images */}
            <div className="col-lg-6">
              <div className="bg-light rounded p-3 shadow-sm">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="img-fluid rounded"
                  style={{ height: '400px', objectFit: 'contain', width: '100%' }}
                />
              </div>
              <div className="d-flex flex-wrap gap-3 mt-3">
                {product?.image?.map((imgSrc, index) => (
                  <div
                    key={index}
                    className={`border rounded ${
                      selectedImage === imgSrc ? 'border-primary border-2' : 'border-light'
                    }`}
                    onClick={() => setSelectedImage(imgSrc)}
                    style={{ width: '80px', height: '80px', cursor: 'pointer' }}
                  >
                    <img
                      src={imgSrc}
                      alt={`Thumbnail ${index + 1}`}
                      className="img-fluid h-100 w-100 p-2 object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="col-lg-6">
              <div className="bg-light p-4 rounded shadow-sm" style={{ backgroundColor: '#e3f2fd' }}>
                <h2 className="fw-bold mb-2 text-dark">{product?.name}</h2>
                <p className="text-muted mb-1">Model No: {product.modelNo}</p>
                <p className="text-muted mb-1">Code: {product.code}</p>
                <p className="text-muted mb-1">Material: {product?.material}</p>
                <p className="text-muted small">{product?.description}</p>

                <div className="my-3">
                  <span className="fs-3 fw-bold text-primary">
                    ¥ {parseFloat(product.price).toFixed(2)}
                  </span>
                </div>

                <div className="mb-4">
                  <label className="form-label">Quantity</label>
                  <div className="d-flex align-items-center gap-3">
                    <div className="d-flex align-items-center border rounded-pill px-2 bg-white">
                      <button
                        className="btn btn-outline-secondary border-0"
                        onClick={decreaseQuantity}
                      >
                        <i className="bi bi-dash"></i>
                      </button>
                      <input
                        type="number"
                        value={quantity}
                        onChange={handleQuantityChange}
                        min="1"
                        className="form-control text-center border-0 shadow-none"
                        style={{ width: '60px' }}
                      />
                      <button
                        className="btn btn-outline-secondary border-0"
                        onClick={increaseQuantity}
                      >
                        <i className="bi bi-plus"></i>
                      </button>
                    </div>
                    <span className="text-muted small">
                      {product.stockQuantity} available
                    </span>
                  </div>
                </div>

                <div className="d-grid gap-2 mb-4">
                  <button
                    className="btn fw-semibold text-white"
                  style={{
  background: 'linear-gradient(to right, rgb(77, 166, 255), rgb(108, 207, 255))',
  padding: '12px',
  borderRadius: '999px',
  fontSize: '1rem',
  color: '#fff', // Optional: ensures text is readable on light background
  border: 'none', // Optional: clean look
}}

                    onClick={addtocart}
                  >
                    Add to Cart – ¥ {(parseFloat(product.price) * quantity).toFixed(2)}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-5">
            <RelatedProducts
              categoryId={product.categoryId}
              currentProductId={product.id}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;
