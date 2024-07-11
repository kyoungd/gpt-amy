import React from 'react';
import SEO from '../components/SEO';
import Header from "../partials/header/Header";
import Breadcrumb from '../container/Breadcrumb/Breadcrumb';
import ContactInformationThree from '../container/ContactInformation/ContactInformationThree.js';
// import GoogleMap from '../container/Map/GoogleMap';
import Footer from '../container/Footer/Footer';
import ScrollToTop from '../components/ScrollToTop.jsx';

const Contact = () => {
    return (
        <React.Fragment>
            <SEO title="OYATE || Contact" />
            <Header />
            <Breadcrumb 
                image="images/bg/breadcrumb-bg-five.jpg"
                title="We are located in Las Vegas, Nevada"
                content="Home"
                contentTwo="Contact Us"
            />
            <ContactInformationThree />
            {/* <GoogleMap /> */}
            <Footer />
            <ScrollToTop />
        </React.Fragment>
    )
}

export default Contact;
