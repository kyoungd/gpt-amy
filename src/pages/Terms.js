import React from 'react';
import SEO from '../components/SEO';
import Header from "../partials/header/Header";
import Breadcrumb from '../container/Breadcrumb/Breadcrumb';
import TermBox from '../container/service/TermBox';
import Footer from '../container/Footer/Footer';
import ScrollToTop from '../components/ScrollToTop.jsx';


const Terms = () => {
    return (
        <React.Fragment>
            <SEO title="2HUMAN || Privacy" />
            <Header />
            <Breadcrumb 
                image="images/bg/breadcrumb-bg-five.jpg"
                title="TERMS AND CONDITIONS"
                content="Home"
                contentTwo="Terms"
            />
            <TermBox />
            <Footer />
            <ScrollToTop />
        </React.Fragment>
    )
}

export default Terms;



