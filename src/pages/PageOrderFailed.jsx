import React from 'react';
import SEO from '../components/SEO';
import Header from "../partials/header/Header";
import Breadcrumb from '../container/Breadcrumb/Breadcrumb';
import FaqFailed from '../container/Faq/FaqFailed';
import Footer from '../container/Footer/Footer';
import ScrollToTop from '../components/ScrollToTop.jsx';

const PageOrderFailed = () => {
    return (
        <React.Fragment>
            <SEO title="2HUMAN || Transaction Failed" />
            <Header />
            <Breadcrumb 
                image="images/bg/breadcrumb-bg-two.jpg"
                title="Transaction Failed!"
                content="Home"
                contentTwo="Order Cancelled"
            />
            <FaqFailed />
            <Footer />
            <ScrollToTop />
        </React.Fragment>
    )
}

export default PageOrderFailed;