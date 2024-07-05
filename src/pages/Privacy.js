import React from 'react';
import SEO from '../components/SEO';
import Header from "../partials/header/Header";
import Breadcrumb from '../container/Breadcrumb/Breadcrumb';
import PrivacyBox from '../container/service/PrivacyBox';
import Footer from '../container/Footer/Footer';
import ScrollToTop from '../components/ScrollToTop.jsx';


const Service = () => {
    return (
        <React.Fragment>
            <SEO title="OYATE || Privacy" />
            <Header />
            <Breadcrumb 
                image="images/bg/breadcrumb-bg-three.jpg"
                title="oyate.ai privacy policy"
                content="Home"
                contentTwo="Privacy"
            />
            <PrivacyBox />
            <Footer />
            <ScrollToTop />
        </React.Fragment>
    )
}

export default Service;



