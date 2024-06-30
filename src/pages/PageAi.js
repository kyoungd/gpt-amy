import React from 'react';
import SEO from '../components/SEO.jsx';
import ChatbotInterface from '../components/ChatbotInterface/ChatbotInterface.jsx';
import Header from "../partials/header/Header.jsx";
import Breadcrumb from '../container/Breadcrumb/Breadcrumb.js';
import Footer from '../container/Footer/Footer.js';
import ScrollToTop from '../components/ScrollToTop.jsx';
import PropTypes from 'prop-types';

const PageAi = ({ id, title }) => {
    return (
        <React.Fragment>
            <SEO title="OYATE || Test AI" />
            <Header />
            <Breadcrumb 
                image="images/bg/breadcrumb-bg-two.jpg"
                title="Test AI!"
                content="AI"
                contentTwo={title}
            />
            <ChatbotInterface id={id} />
            <Footer />
            <ScrollToTop />
        </React.Fragment>
    )
}

PageAi.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
};
 
export default PageAi;