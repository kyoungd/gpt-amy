import React from 'react';
import SEO from '../components/SEO';
import Header from "../partials/header/Header";
import Breadcrumb from '../container/Breadcrumb/Breadcrumb';
import SoftwareConsultingBox from '../container/service/SoftwareConsultingBox';
import Footer from '../container/Footer/Footer';
import ScrollToTop from '../components/ScrollToTop.jsx';

const PageConsultingAgreement = () => {
    return (
        <React.Fragment>
            <SEO title="2HUMAN || Privacy" />
            <Header />
            <Breadcrumb 
                image="images/bg/breadcrumb-bg-three.jpg"
                title="2human.ai software consulting agreement"
                content="Home"
                contentTwo="Software Consulting Agreement"
            />
            <SoftwareConsultingBox />
            <Footer />
            <ScrollToTop />
        </React.Fragment>
    )
}

export default PageConsultingAgreement;



