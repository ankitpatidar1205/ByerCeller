import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../Utilities/axiosInstance";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51QjO3HAkiLZQygvDSwucdMyDyPbxIHJBq2OUFL9cYV3OhWbxcIy3Zn84pjzC0r4CYvHQwvklMJmkxYFOLhGj1OBU00cL8KKeIN");

const UserCart = () => {
  const [cartItems, setCartItems] = useState([]);

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + Number(item.price) * item.quantity, 0);
  };

  const removeItem = async (id) => {
    try {
      const res = await axiosInstance.delete(`/cart/deleteCartItem/${id}`);
      if (res.status === 200 || res.data?.message === "Deleted successfully") {
        setCartItems(cartItems.filter((item) => item.id !== id));
      } else {
        console.error("Failed to delete item from cart:", res);
      }
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  const fetchCartById = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;
    if (!userId) return;
    try {
      const res = await axiosInstance.get(`/cart/getCartByUserId/${userId}`);
      const data = res.data?.data || [];
      console.log(data)
      const processedData = data.map((item) => ({
        ...item,
        price: Number(item.price),
        originalPrice: item.originalPrice ? Number(item.originalPrice) : null,
      }));
      setCartItems(processedData);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  useEffect(() => {
    fetchCartById();
  }, []);

  const handleQuantity = async (id, actionValue) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;
    const item = cartItems.find((item) => item.id === id);
    if (!item || !userId) return;

    try {
      const response = await axiosInstance.patch("/cart/updateCart", {
        id: item.id,
        userId: userId,
        productId: item.productId,
        action: actionValue,
      });

      if (response.status === 200) {
        await fetchCartById();
      } else {
        console.error("Failed to update quantity:", response);
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  return (
    <>
      <div className="p-5 mt-5 py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h2">Shopping Cart</h1>
          <Link to="/UserProduct" className="btn btn-link text-decoration-none">
            <i className="bi bi-arrow-left me-2"></i>
            Continue Shopping
          </Link>
        </div>

        <div className="row">
          <div className="col-lg-8 mb-4 mb-lg-0">
            <div className="card shadow-sm mb-4">
              <div className="card-header bg-white d-flex justify-content-between align-items-center py-3">
                <h2 className="h5 mb-0">Cart Items ({cartItems.length})</h2>
              </div>
              <div className="card-body">
                {cartItems.length === 0 ? (
                  <div className="text-center py-5">
                    <i className="bi bi-cart-x fs-1 text-muted"></i>
                    <p className="mt-3">Your cart is empty</p>
                    <Link to="/UserProduct" className="btn custom-button mt-3">
                      Continue Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="list-group list-group-flush">
                    {cartItems.map((item) => (
                      <div key={item.id} className="list-group-item py-4">
                        <div className="row align-items-center">
                          <div className="col-md-2 mb-3 mb-md-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="img-fluid rounded"
                              style={{ width: "100px", height: "100px", objectFit: "cover" }}
                            />
                          </div>
                          <div className="col-md-5 mb-3 mb-md-0">
                            <h3 className="mb-1 fw-bold">{item?.productName}</h3>
                         <p className="small text-muted mb-1">
                       {item?.description.length > 100   ? item.description.substring(0, 100) + "..."  : item.description}   </p>
                            <div className="mt-2">
                              <span className="fw-bold">¥{Number(item.price).toFixed(2)}</span>
                              {item.originalPrice && (
                                <span className="text-muted text-decoration-line-through ms-2">
                                  ${Number(item.originalPrice).toFixed(2)}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="col-md-5">
                            <div className="d-flex align-items-center justify-content-between">
                              <div className="d-flex align-items-center">
                                <button
                                  className="btn btn-outline-secondary btn-sm"
                                  onClick={() => handleQuantity(item.id, -1)}
                                >
                                  <i className="bi bi-dash"></i>
                                </button>
                                <input
                                  type="number"
                                  min="1"
                                  value={item.quantity}
                                  readOnly
                                  className="form-control form-control-sm text-center mx-2"
                                  style={{ width: "60px" }}
                                />
                                <button
                                  className="btn btn-outline-secondary btn-sm"
                                  onClick={() => handleQuantity(item.id, 1)}
                                >
                                  <i className="bi bi-plus"></i>
                                </button>
                              </div>
                              <div className="text-end">
                                <div className="fw-bold">
                                  ${(Number(item.price) * item.quantity).toFixed(2)}
                                </div>
                                <button
                                  className="btn btn-link text-danger p-0 small"
                                  onClick={() => removeItem(item.id)}
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card shadow-sm sticky-top" style={{ top: "20px", zIndex: "0" }}>
              <div className="card-header bg-white py-3">
                <h2 className="h5 mb-0">Order Summary</h2>
              </div>
              <div className="card-body">
                <div className="mb-4">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Subtotal</span>
                    <span className="fw-bold">¥{calculateSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="border-top pt-3 mt-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="fw-bold">Total</span>
                      <span className="h4 fw-bold"> {calculateSubtotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <Elements stripe={stripePromise}>
                  <CheckoutForm cartItems={cartItems} totalAmount={calculateSubtotal().toFixed(2)} />
                </Elements>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const CheckoutForm = ({ cartItems, totalAmount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;
    const cartId = cartItems.map((item) => item.id);

    try {
      const res = await axiosInstance.post(`/stripe/createCartPayment`, {
        userId,
        cartId,
        totalAmount,
      });

      const clientSecret = res.data.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user.name,
          },
        },
      });

      if (result.error) {
        alert(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        alert("Payment successful!");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement className="form-control mb-3" />
      <button className="btn custom-button w-100" type="submit" disabled={!stripe || loading}>
        {loading ? "Processing..." : `Pay $${totalAmount}`}
      </button>
    </form>
  );
};

export default UserCart;
