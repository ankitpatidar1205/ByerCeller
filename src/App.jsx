import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./layout/Navbar";
import Sidebar from "./layout/Sidebar";
import { useState } from "react";
import Dashboard from "./Componente/Dashboard/Dashboard";
import Orders from "./Componente/Orders/Orders";
import BannerManager from "./Componente/Banner/BannerManager";
import Users from "./Componente/Users/Users";
import Productes from "./Componente/Products/Products";
import Inventory from "./Componente/Inventory/Inventory";
import Home from "./Home/Home";
import ElectricalProducts from "./Home/ElectricalProducts";
import ShoppingCart from "./Home/ShoppingCart";
import Login from "./authtication/Login";
import Signup from "./authtication/Signup";
import AddCategories from "./Componente/Categories/AddCategories";
import ProductPage from "./Home/ProductPage";
import AddProduct from "./Componente/Products/AddProduct";
import ProfilePage from "./UserProfile/ProfilePage";
import AdminProfile from "./Componente/AdminProfile/AdminProfile";
import ContactUs from "./Home/ContactUs";
import RelatedProducts from "./Home/ProductDetails";
import AboutUs from "./Policy/AboutUs";
import PrivacyPolicy from "./Policy/PrivacyPolicy";
import TermsAndConditions from "./Policy/TermsAndConditions";
import RefundPolicy from "./Policy/RefundPolicy";
import ScrollToTop from "./Utilities/ScrollToTop";
import EditProductForm from "./Componente/Products/EditProduct";
import MainReport from "./Componente/ReportAnalytics/MainReport";

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const menusidebarcollaps = () => {
    setIsSidebarCollapsed(true);
  };
  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };
  const location = useLocation();
  const hideLayout = location.pathname === "/" || location.pathname === "/electricalproducts"  || location.pathname === "/contactus" || location.pathname === "/profilepage" || location.pathname === "/productpage" || location.pathname === "/shoppingcart" || location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/aboutus" || location.pathname === "/privacypolicy" || location.pathname === "/terms" || location.pathname === "/refund" || location.pathname.startsWith("/productpage" );
  return (
    <>
      <ScrollToTop />
      {/* Home Page (No Layout) */}
      {hideLayout ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/electricalproducts" element={<ElectricalProducts />} />
          <Route path="/shoppingcart" element={<ShoppingCart />} />
          <Route path="/productpage/:id" element={<ProductPage />} />
           <Route path="/profilepage" element={<ProfilePage />} />
          <Route path="/profilepage" element={<ProfilePage />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/productdetails" element={<RelatedProducts />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/refund" element={<RefundPolicy />} />
        </Routes>
      ) : (
        // Pages with Layout
        <>
          <Navbar toggleSidebar={toggleSidebar} />
          <div className="main-content">
            <Sidebar  collapsed={isSidebarCollapsed}  menuItemClick={menusidebarcollaps}/>
            <div   className={`right-side-content ${isSidebarCollapsed ? "collapsed" : "" }`} >
              <Routes>
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/categories" element={<AddCategories />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/users" element={<Users />} />
                <Route path="/bannermanager" element={<BannerManager />} />
                {/* products */}
                <Route path="/products" element={<Productes />} />
                <Route path="/addproducts" element={<AddProduct />} />
                <Route path="/editproducts/:id" element={<EditProductForm />} />
                <Route path="/MainReport" element={<MainReport />} />

                <Route path="/inventory" element={<Inventory />} />
                <Route path="/Admin-Profile" element={<AdminProfile />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;
