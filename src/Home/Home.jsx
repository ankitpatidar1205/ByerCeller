import React from 'react';
import HeroSection from './HeroSection';
import FeaturedProducts from './FeaturedProducts';
import Footer from './Footer';
import CategoriesSection from './CategoriesSection';
import FeatureHighlights from './FeatureHighlights ';
import CustomerTestimonials from './CustomerTestimonials';
import SubscribeSection from './SubscribeSection';
import Navbar from './Navbar';
import Categoriesslider from './Categoriesslider';

const Home = () => {
  return (
    <>
    <Navbar/>
      <div >
        {/* <HeroSection /> */}
        <Categoriesslider/>
        {/* <FeaturedProducts /> */}

        <FeatureHighlights />
        {/* <CustomerTestimonials/> */}
        <SubscribeSection/>
      </div>
      <Footer/>
    </>
  );
};

export default Home;