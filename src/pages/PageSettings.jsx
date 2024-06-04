import React from 'react';
import PropTypes from 'prop-types';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import SEO from '../components/SEO';
import Header from "../partials/header/Header";
import Breadcrumb from '../container/Breadcrumb/Breadcrumb';
import Footer from '../container/Footer/Footer';
import ScrollToTop from '../components/ScrollToTop.jsx';
import ShowCards from '../components/SettingsForm/showCards';

PageSettings.propTypes = {
    jwt: PropTypes.string.isRequired,
    classOption: PropTypes.string
};

PageSettings.defaultProps = {
    classOption: "section section-padding-t90 section-padding-bottom"
};

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API_KEY);

function PageSettings ({jwt, classOption}) {
    return (
        <React.Fragment>
            <SEO title="Saracoti || Settings" />
            <Header />
            <Breadcrumb 
                image="images/bg/breadcrumb-bg-five.jpg"
                title="We are an agency located in New York"
                content="Home"
                contentTwo="Settings"
            />
            <div className={`section section-padding-t90 section-padding-bottom ${classOption}`}>
                <div className="container">
                    <Elements stripe={stripePromise}>
                        <ShowCards token={jwt} />
                        {/* <UpdateCard jwt={jwt} /> */}
                        {/* <SettingsForm jwt={jwt} /> */}
                    </Elements>
                </div>
            </div>
            <Footer />
            <ScrollToTop />
        </React.Fragment>
    )
}

export default PageSettings;
