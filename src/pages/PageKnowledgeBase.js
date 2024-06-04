import React from 'react';
import SEO from '../components/SEO';
import Header from "../partials/header/Header";
import Breadcrumb from '../container/Breadcrumb/Breadcrumb';
import UploadContainer from '../container/Uploads/UploadContainer'
import Footer from '../container/Footer/Footer';
import ScrollToTop from '../components/ScrollToTop';
import PropTypes from 'prop-types';

const PageContent = ({jwt}) => {
    return (
        <React.Fragment>
            <SEO title="SARACOTI || knowledge base" />
            <Header />
            <Breadcrumb 
                image="images/bg/breadcrumb-bg-three.jpg"
                title="UPLOAD DOCUMENTS"
                content="Train AI"
                contentTwo="Upload Documents"
            />
            <UploadContainer token={jwt} />
            <Footer />
            <ScrollToTop />
        </React.Fragment>
    )
}

PageContent.propTypes = {
    jwt: PropTypes.string
};
 
export default PageContent;



