import React from 'react';

import FeaturedProducts from './FeaturedProducts';
import Footer from './Footer';
import CategoriesSection from './CategoriesSection';
import FeatureHighlights from './FeatureHighlights ';
import CustomerTestimonials from './CustomerTestimonials';
import SubscribeSection from './SubscribeSection';
import Navbar from './Navbar';
import Categoriesslider from './Categoriesslider';
import HeroSection from './HeroSection';

const Home = () => {
  return (
    <>
    <Navbar/>
      <div >
        {/* <HeroSection/> */}
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