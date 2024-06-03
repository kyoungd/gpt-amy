import React from 'react';
import SEO from '../components/SEO';
import Header from "../partials/header/Header";
import Breadcrumb from '../container/Breadcrumb/Breadcrumb';
import Footer from '../container/Footer/Footer';
import ScrollToTop from '../components/ScrollToTop.jsx';

const Service = () => {
    const classOption = "section section-padding-t90 section-padding-bottom";
    return (
        <React.Fragment>
            <SEO title="2HUMAN || Service" />
            <Header />
            <Breadcrumb 
                image="images/bg/breadcrumb-bg-three.jpg"
                title="We work with bold brands that we believe in"
                content="Home"
                contentTwo="Services"
            />
            <div className={
                `section section-padding-t90 section-padding-bottom ${classOption}`
            }>
            </div>
            <Footer />
            <ScrollToTop />
        </React.Fragment>
    )
}

export default Service;


