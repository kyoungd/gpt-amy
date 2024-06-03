import React, { useRef } from 'react';
import SEO from '../components/SEO';
import Header from "../partials/header/Header";
import IntroThree from '../container/IntroSlider/IntroThree';
import HomeAboutThree from '../container/About/HomeAboutThree';
import Funfact from '../container/Funfact/Funfact';
import ServiceIconBox from '../container/service/ServiceIconBoxTwo';
import ContactInformation from '../container/ContactInformation/ContactInformationThree';
import Footer from '../container/Footer/Footer';
import ScrollToTop from '../components/ScrollToTop.jsx';
import ThreeDotWave from '../components/Work/ThreeDotWave.jsx';

// import Faq from '../container/Faq/Faq';
// import PortfolioTwo from '../container/Portfolio/PortfolioTwo';
// import Team from '../container/Team/Team';
// import TestimonialContainer from '../container/Testimonial/TestimonialContainer';
// import CallToAction from '../container/CallToAction/CallToAction';
// import HomeBlog from '../container/BlogGrid/HomeBlog';
// import BrandContainer from '../container/Brand/BrandContainer';

const HomeThree = () => {
    const sectionLearnMore = useRef(null);

    return (
        <React.Fragment>
            {sectionLearnMore && <div>
                <SEO title="2Human AI || Customer Service AI" />
                <Header />
                <IntroThree refSectionLearnMore={sectionLearnMore} />
                <HomeAboutThree refSectionLearnMore={sectionLearnMore} />
                <Funfact classOption="section-padding bg-primary-blue" />
                <ServiceIconBox />
                {/* <Faq />
                <PortfolioTwo />
                <Team /> */}
                {/* <TestimonialContainer /> */}
                {/* <CallToAction /> */}
                {/* <HomeBlog /> */}
                <ContactInformation classOption="bg-primary-blue" />
                {/* <BrandContainer classOption="section-padding" /> */}
                <Footer />
                <ScrollToTop />
            </div>}
            {!sectionLearnMore && <ThreeDotWave/>}
        </React.Fragment>
    );
};

export default HomeThree;
