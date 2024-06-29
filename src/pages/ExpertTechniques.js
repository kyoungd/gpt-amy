import React from 'react';
import SEO from '../components/SEO';
import Header from "../partials/header/Header";
import Breadcrumb from '../container/Breadcrumb/Breadcrumb';
import Techniques from '../components/Techniques';
import Footer from '../container/Footer/Footer';
import ScrollToTop from '../components/ScrollToTop.jsx';


const ExpertTechniques = () => {
    return (
        <React.Fragment>
            <SEO title="OYATE || Main" />
            <Header />
            <Breadcrumb 
                image="images/bg/breadcrumb-bg-three.jpg"
                title="Best technology and research for trading"
                content="Home"
                contentTwo="Main"
            />
            <Techniques />
            <Footer />
            <ScrollToTop />
        </React.Fragment>
    )
}

export default ExpertTechniques;
