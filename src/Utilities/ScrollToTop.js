import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Jab bhi route change hoga, scroll top ho jaayega
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
