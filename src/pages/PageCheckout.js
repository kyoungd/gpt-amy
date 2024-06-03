import React from 'react';
import SEO from '../components/SEO.jsx';
import Header from "../partials/header/Header.jsx";
import Breadcrumb from '../container/Breadcrumb/Breadcrumb.js';
import AboutCheckout from '../container/About/AboutCheckout.js';
import Footer from '../container/Footer/Footer.js';
import ScrollToTop from '../components/ScrollToTop.jsx';
import PropTypes from 'prop-types';

// import TestimonialContainer from '../container/Testimonial/TestimonialContainer';
// import CallToActionTwo from '../container/CallToAction/CallToActionTwo';

AboutUs.propTypes = {
    jwt: PropTypes.string.isRequired
};

export default function AboutUs ({jwt}) {

    return (
        <React.Fragment>
            <SEO title="2HUMAN || About" />
            <Header />
            <Breadcrumb 
                image="images/bg/breadcrumb-bg.jpg"
                title="A few steps to get started with 2HUMAN AI."
                content="Home"
                contentTwo="Learn More"
            />
            <AboutCheckout />
           
            <Footer />
            <ScrollToTop />
        </React.Fragment>
    )
}

