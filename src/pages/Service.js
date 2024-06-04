import React from 'react';
import SEO from '../components/SEO';
import Header from "../partials/header/Header";
import Breadcrumb from '../container/Breadcrumb/Breadcrumb';
import ServiceIconBoxTwo from '../container/service/ServiceIconBoxTwo';
import ServiceSkill from '../container/service/ServiceSkill';
import Footer from '../container/Footer/Footer';
import ScrollToTop from '../components/ScrollToTop.jsx';


const Service = () => {
    return (
        <React.Fragment>
            <SEO title="SARACOTI || Service" />
            <Header />
            <Breadcrumb 
                image="images/bg/breadcrumb-bg-three.jpg"
                title="AI Powered Platform for Business"
                content="Home"
                contentTwo="Services"
            />
            <ServiceIconBoxTwo />
            <Footer />
            <ScrollToTop />
        </React.Fragment>
    )
}

export default Service;



