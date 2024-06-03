import React, { useRef } from 'react';
import SEO from '../components/SEO';
import Header from "../partials/header/Header";
import IntroSlider from '../container/IntroSlider/IntroSlider';
import HomeAbout from '../components/About/HomeAbout.jsx';
import Funfact from '../container/Funfact/Funfact';
import Footer from '../container/Footer/Footer';
import ScrollToTop from '../components/ScrollToTop.jsx';
import ServiceIconBox from '../container/service/ServiceIconBoxTwo';
import ContactInformation from '../container/ContactInformation/ContactInformationThree';

const HomeOne = () => {
    const sectionLearnMore = useRef(null);
    return (
        <React.Fragment>
            <SEO title="2HUMAN – AI For Starr Ups" />
            <Header />
            <IntroSlider refSectionLearnMore={sectionLearnMore} />
            <HomeAbout refSectionLearnMore={sectionLearnMore} />
            <Funfact classOption="section-padding bg-primary-blue" />
            <ServiceIconBox />
            <ContactInformation classOption="bg-primary-blue" />
            <Footer />
            <ScrollToTop />
        </React.Fragment>
    )
}

export default HomeOne;
