import React from 'react';
import { useParams } from "react-router-dom";
import Header from "../partials/header/Header.jsx";
import Footer from '../container/Footer/Footer.js';
import Breadcrumb from '../container/Breadcrumb/Breadcrumb.js';
import AgreementCheckbox from '../components/AgreementCheckbox/AgreementCheckbox.jsx';
import SEO from '../components/SEO.jsx';
import ScrollToTop from '../components/ScrollToTop.jsx';
import { useUserState } from '../components/UserContext.jsx';

const PageAgreementCheckbox = () => {
    let { id } = useParams();
    const { isAuthenticated, jwt } = useUserState();
    const title = "Agreements before Purchase";
    return (
        <React.Fragment>
            <SEO title="OYATE – Agreement Checkbox" />
            <Header />
            <Breadcrumb 
                image="images/bg/breadcrumb-bg-three.jpg"
                title={title}
                content="Home"
                contentTwo="Get Started"
            />
            { isAuthenticated && <AgreementCheckbox token={jwt} id={id} /> }
            <Footer />
            <ScrollToTop />
        </React.Fragment>
    )
}

export default PageAgreementCheckbox;
