import React from 'react';
import SEO from '../components/SEO.jsx';
import ChatbotInterface from '../components/ChatbotInterface/ChatbotInterface.jsx';
import Header from "../partials/header/Header.jsx";
import Breadcrumb from '../container/Breadcrumb/Breadcrumb.js';
import Footer from '../container/Footer/Footer.js';
import ScrollToTop from '../components/ScrollToTop.jsx';
import PropTypes from 'prop-types';

const PageAi = ({ jwt }) => {
    return (
        <React.Fragment>
            <SEO title="OYATE || Test AI" />
            <Header />
            <Breadcrumb 
                image="images/bg/breadcrumb-bg-two.jpg"
                title="Test Your AI!"
                content="Train AI"
                contentTwo="Test Your AI"
            />
            <ChatbotInterface jwt={jwt} />
            <Footer />
            <ScrollToTop />
        </React.Fragment>
    )
}

PageAi.propTypes = {
    jwt: PropTypes.string
};
 
export default PageAi;