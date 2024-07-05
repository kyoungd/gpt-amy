import React from 'react';
import SEO from '../components/SEO';
import Header from "../partials/header/Header";
import Breadcrumb from '../container/Breadcrumb/Breadcrumb';
import SoftwareAsServiceBox from '../container/service/SoftwareAsServiceBox';
import Footer from '../container/Footer/Footer';
import ScrollToTop from '../components/ScrollToTop.jsx';

const PageSoftwareAsService = () => {
    return (
        <React.Fragment>
            <SEO title="OYATE || SAAS agreement" />
            <Header />
            <Breadcrumb 
                image="images/bg/breadcrumb-bg-three.jpg"
                title="oyate.iai SAAS agreement"
                content="Home"
                contentTwo="SAAS agreement"
            />
            <SoftwareAsServiceBox />
            <Footer />
            <ScrollToTop />
        </React.Fragment>
    )
}

export default PageSoftwareAsService;



