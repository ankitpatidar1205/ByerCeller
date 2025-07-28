import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../Utilities/axiosInstance';

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get("/product/getAllProducts");
        console.log(res);
        setProducts(res?.data?.data || []);
      } catch (error) {
        console.error("Product fetch error:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="bg-white py-5 px-3">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="h3 fw-bold text-dark">Featured Products</h2>
          <p className="mt-2 text-muted small">
            Top-rated electrical supplies for professionals
          </p>
        </div>

        <div className="row">
          {products?.slice(0, 8).map((product, index) => (
            <>
            <div key={index} className="col-12 col-sm-6 col-lg-3 mb-4 d-flex">
            <Link  to={`/productpage/${product.id}`}>
              <div className="card shadow-lg w-100  d-flex flex-column" style={{ borderRadius: "20px" }}>
                <div
                  className="card-img-top rounded-top-3"
                  style={{
                    backgroundImage: `url(${product.image[0]})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '14rem',
                     borderTopLeftRadius: '20px',
                            borderTopRightRadius: '20px',
                  }}
                ></div>

                <div className="card-body d-flex flex-column">
                  <div className="mb-2">
                    <span className="badge bg-primary bg-opacity-10 text-white">
                      {product.category_name}
                    </span>
                  </div>
                  <h5 className="card-title mb-1 text-dark fw-semibold">{product.name}</h5>
                  <p className="card-text text-muted small mb-3">{product.description}</p>

                  <div className="mt-auto d-flex justify-content-between align-items-center">
                    <span className="text-primary fw-bold">${product.price}</span>
                    <button className="btn btn-primary btn-sm rounded-pill">
                      View
                    </button>
                  </div>
                </div>
              </div>
            </Link>
            </div>
            </>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
