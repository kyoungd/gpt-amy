import React from 'react';
import SEO from '../components/SEO.jsx';
import ChatbotInterface from '../components/ChatbotInterface/ChatbotInterface.jsx';
import Header from "../partials/header/Header.jsx";
import Breadcrumb from '../container/Breadcrumb/Breadcrumb.js';
import Footer from '../container/Footer/Footer.js';
import ScrollToTop from '../components/ScrollToTop.jsx';
import PropTypes from 'prop-types';
import ChatbotDemo from '../components/ChatbotDemo/ChatbotDemo.jsx';
import dataApointment from '../data/demo/appointment.json';
import dataCarPart from "../data/demo/carpart.json";
import dataTireStore from "../data/demo/tirestore.json";
import dataTrialOffer from "../data/demo/trialoffer.json";

function getData(title) {
    switch (title) {
        case 'appointment':
            return dataApointment;
        case 'car parts':
            return dataCarPart;
        case 'tire store':
            return dataTireStore;
        case 'trial offer':
            return dataTrialOffer;
        default:
            return [];
    }
}

const PageAi = ({ id, title }) => {
    const data = getData(title);
    return (
        <React.Fragment>
            <SEO title="OYATE || Test AI" />
            <Header />
            <Breadcrumb 
                image="images/bg/breadcrumb-bg-two.jpg"
                title="Test AI"
                content="AI"
                contentTwo={title}
            />
            <ChatbotDemo chatData={data} />
            <ChatbotInterface key={title} title={title} id={id} />
            <Footer />
            <ScrollToTop />
        </React.Fragment>
    )
}

PageAi.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
};

PageAi.defaultProps = {
    title: "AI"
};

export default PageAi;