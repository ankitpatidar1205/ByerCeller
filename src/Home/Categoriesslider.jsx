import  { useEffect, useRef, useState } from 'react';
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
      }, 3000); // Changed to 3 seconds for better UX
    };

    startScrolling();

    // Pause on hover for better UX
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
    <section className="py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 mt-4">
          Browse by Categories
        </h2>

        <div className="overflow-hidden relative"   ref={scrollRef}  style={{ cursor: 'grab' }} >
          <div className="flex mb-4 space-x-6 transition-all duration-700 ease-in-out w-max">
            {loading ? (
              <div className="min-w-[250px] bg-white rounded-2xl shadow-md p-4 animate-pulse">
                <div className="w-full h-40 bg-gray-200 rounded-xl"></div>
                <div className="h-6 bg-gray-200 rounded mt-4"></div>
              </div>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : categories.length > 0 ? (
              categories.map((cat, index) => (
              <>
      <Link to="/electricalproducts">
          <div key={cat._id || index}
                  className="min-w-[250px] bg-white rounded-2xl shadow-md hover:shadow-xl transition p-4" >
                  <img  src={cat.image}   alt={cat.name}
                    className="w-full h-40 object-cover rounded-xl"
                    onError={(e) => {  e.target.onerror = null;  e.target.src = 'https://via.placeholder.com/250'; }}/>
                  <h3 className="text-lg font-semibold mt-4 text-gray-700">
                    {cat.name}
                  </h3>
                </div>
           </Link>
              </>
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