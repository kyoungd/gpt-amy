
import React from 'react';
import SEO from '../components/SEO';
import Header from "../partials/header/Header";
import Breadcrumb from '../container/Breadcrumb/Breadcrumb';
import GetStartedStartup from '../container/GetStarted/GetStartedStartup';
import Footer from '../container/Footer/Footer';
import ScrollToTop from '../components/ScrollToTop.jsx';
import PropTypes from 'prop-types';

const HomeGetStarted = ({jwt, showBlockName}) => {
    const title = "Advantages of 2HUMAN";
    return (
        <React.Fragment>
            <SEO title="2HUMAN || Get Started" />
            <Header />
            <Breadcrumb 
                image="images/bg/breadcrumb-bg-three.jpg"
                title={title}
                content="Home"
                contentTwo="Get Started"
            />
            <GetStartedStartup jwt={jwt} showBlockName={showBlockName} />
            <Footer />
            <ScrollToTop />
        </React.Fragment>
    )
}

HomeGetStarted.propTypes = {
    jwt: PropTypes.string.isRequired,
    showBlockName: PropTypes.string
};

HomeGetStarted.defaultProps = {
    showBlockName: "all"
};

export default HomeGetStarted;


