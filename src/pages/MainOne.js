import React from 'react';
import SEO from '../components/SEO';
import Header from "../partials/header/Header";
import Breadcrumb from '../container/Breadcrumb/Breadcrumb';
import Dashboard from '../components/Dashboard';
import Footer from '../container/Footer/Footer';
import ScrollToTop from '../components/ScrollToTop.jsx';


const MainOne = () => {
    return (
        <React.Fragment>
            <SEO title="SARACOTI || Main" />
            <Header />
            <Breadcrumb 
                image="images/bg/breadcrumb-bg-three.jpg"
                title="Best technology and research for trading"
                content="Home"
                contentTwo="Main"
            />
            <Dashboard />
            <Footer />
            <ScrollToTop />
        </React.Fragment>
    )
}

export default MainOne;
