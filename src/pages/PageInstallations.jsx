import React from 'react';
import Header from "../partials/header/Header";
import Footer from '../container/Footer/Footer';
import Breadcrumb from '../container/Breadcrumb/Breadcrumb';
import SetupSteps from '../components/SetupSteps/SetupSteps';
import SEO from '../components/SEO';
import ScrollToTop from '../components/ScrollToTop.jsx';
import { useUserState } from '../components/UserContext';

const PageSetupSteps = () => {
    const { isAuthenticated, jwt } = useUserState();
    const title = "Installation Status";
    return (
        <React.Fragment>
            <SEO title="OYATE – Installation Status" />
            <Header />
            <Breadcrumb 
                image="images/bg/breadcrumb-bg-three.jpg"
                title={title}
                content="Installation Status"
                contentTwo="Here are key steps to get your services up and running."
            />
            { isAuthenticated && <SetupSteps jwtToken={jwt} /> }
            <Footer />
            <ScrollToTop />
        </React.Fragment>
    )
}

export default PageSetupSteps;
