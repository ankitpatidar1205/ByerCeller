import { useEffect, useRef, useState } from 'react';
import axiosInstance from '../Utilities/axiosInstance';
import { Link } from 'react-router-dom';

const Categoriesslider = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get('/category/getAllCategories');
        setCategories(res?.data?.data || []);
        setError(null);
      } catch (error) {
        console.error('Category fetch error:', error);
        setError('Failed to load categories');
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (categories.length === 0) return;

    const container = scrollRef.current;
    let index = 0;

    const startScrolling = () => {
      intervalRef.current = setInterval(() => {
        if (!container) return;
        index = (index + 1) % categories.length;
        const scrollAmount = container.clientWidth * index;
        container.scrollTo({
          left: scrollAmount,
          behavior: 'smooth',
        });
      }, 3000);
    };

    startScrolling();

    const handleMouseEnter = () => clearInterval(intervalRef.current);
    const handleMouseLeave = () => startScrolling();

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearInterval(intervalRef.current);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [categories]);

  return (
    <section className="py-10" style={{ backgroundColor: "#f0f7ff" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 mt-4" style={{color:"#0d47a1"}}>
          Browse by Categories
        </h2>

        <div
          className="overflow-hidden relative"
          ref={scrollRef}
          style={{ cursor: 'grab' }}
        >
          <div className="flex mb-4 space-x-6 transition-all duration-700 ease-in-out w-max">
            {loading ? (
              <div className="min-w-[250px] h-[250px] bg-white rounded-2xl shadow-md p-4 animate-pulse">
                <div className="w-full h-full bg-gray-200 rounded-xl"></div>
              </div>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : categories.length > 0 ? (
              categories.map((cat, index) => (
                <Link to="/electricalproducts" key={cat._id || index}>
                  <div className="min-w-[250px] h-[300px] bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden flex flex-col">
                    <div className="w-full h-[180px] bg-[#f0f7ff]">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/250';
                        }}
                      />
                    </div>
                    <div className="p-4  flex-1 flex items-center justify-center" style={{ background: 'linear-gradient(to bottom right, #e0f2ff, #f2f9ff)' }}
>
                      <h3 className="text-base font-semibold text-gray-800 text-center" >
                        {cat.name}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-gray-500">No categories found</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categoriesslider;
