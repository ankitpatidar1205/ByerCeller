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
 <section className="px-3" style={{backgroundColor:"#f0f7ff"}}>
  <div className="container">
    <div className="text-center mb-5">
      <h2 className="h3 fw-bold text-dark">Featured Products</h2>
      <p className="mt-2 text-muted small">
        Top-rated electrical supplies for professionals
      </p>
    </div>

    <div className="row">
      {products?.slice(0, 8).map((product, index) => (
        <div key={index} className="col-12 col-sm-6 col-lg-3 mb-4 d-flex">
          <Link to={`/productpage/${product.id}`} className="w-100 text-decoration-none">
            <div
              className="card shadow w-100 d-flex flex-column"
              style={{
                borderRadius: '20px',
                background: 'linear-gradient(to bottom right, #e0f2ff, #f2f9ff)',
                height: '100%',
                minHeight: '420px',
                maxHeight: '430px',
                overflow: 'hidden',
              }}
            >
              <div
                className="card-img-top"
                style={{
                  backgroundImage: `url(${product.image[0]})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '14rem',
                  borderTopLeftRadius: '20px',
                  borderTopRightRadius: '20px',
                }}
              ></div>

              <div className="card-body d-flex flex-column p-3">
                <div className="mb-2">
                  <span
                    className="badge text-white"
                    style={{
                      backgroundColor: '#4da6ff',
                      fontSize: '0.75rem',
                      padding: '0.4em 0.6em',
                      borderRadius: '12px',
                    }}
                  >
                    {product.category_name}
                  </span>
                </div>

                <h5
                  className="card-title mb-1 fw-bold text-dark"
                  style={{ fontSize: '1.05rem', minHeight: '3rem' }}
                >
                  {product.name}
                </h5>

                <p
                  className="card-text text-muted small mb-3"
                  style={{ fontSize: '0.85rem', flexGrow: 1 }}
                >
                  {product.description?.length > 80
                    ? product.description.slice(0, 100) + '...'
                    : product.description}
                </p>

                <div className="mt-auto d-flex justify-content-between align-items-center">
                  <span className="text-primary fw-bold">¥{product.price}</span>
                  <button
                    className="btn btn-sm rounded-pill text-white"
                    style={{
                      background: 'linear-gradient(to right, #4da6ff, #6ccfff)',
                      border: 'none',
                    }}
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  </div>
</section>

  );
};

export default FeaturedProducts;
