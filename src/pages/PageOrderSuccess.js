import React from 'react';
import SEO from '../components/SEO';
import Header from "../partials/header/Header";
import Breadcrumb from '../container/Breadcrumb/Breadcrumb';
import AboutSeven from '../container/About/AboutSeven';
import Faq from '../container/Faq/Faq';
import Footer from '../container/Footer/Footer';
import ScrollToTop from '../components/ScrollToTop.jsx';
import PropTypes from 'prop-types';

const PageOrderSuccess = ({ jwt }) => {
    return (
        <React.Fragment>
            <SEO title="SARACOTI || Order Success" />
            <Header />
            <Breadcrumb 
                image="images/bg/breadcrumb-bg-two.jpg"
                title="Let's get started!"
                content="Account"
                contentTwo="Contact Us"
            />
            {/* <Faq /> */}
            <AboutSeven jwt={jwt} />
            <Footer />
            <ScrollToTop />
        </React.Fragment>
    )
}

PageOrderSuccess.propTypes = {
    jwt: PropTypes.string
};
 
export default PageOrderSuccess;