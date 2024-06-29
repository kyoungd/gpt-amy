import React from 'react';
import Header from "../partials/header/Header";
import Footer from '../container/Footer/Footer';
import Breadcrumb from '../container/Breadcrumb/Breadcrumb';
import SEO from '../components/SEO';
import ScrollToTop from '../components/ScrollToTop.jsx';
import { useUserState } from '../components/UserContext';
import ServiceDetail from '../components/SetupSteps/ServiceDetail';

const PageInstallationDetail = () => {
    const { isAuthenticated, jwt } = useUserState();
    const title = "Service Detail";
    return (
        <React.Fragment>
            <SEO title="OYATE – Service Detail" />
            <Header />
            <Breadcrumb 
                image="images/bg/breadcrumb-bg-three.jpg"
                title={title}
                content="Service Detail"
                contentTwo="Here are key steps to get your services up and running."
            />
            { isAuthenticated && <ServiceDetail jwtToken={jwt} /> }
            <Footer />
            <ScrollToTop />
        </React.Fragment>
    )
}

export default PageInstallationDetail;
