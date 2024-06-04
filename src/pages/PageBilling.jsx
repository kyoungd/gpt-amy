import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import { getPaymentMethodManagement } from '../utils/stripe-subscriptions.js';
import ThreeDotWave from '../components/Work/ThreeDotWave';

// components
import SEO from '../components/SEO';
import Header from "../partials/header/Header";
import Breadcrumb from '../container/Breadcrumb/Breadcrumb';
import Footer from '../container/Footer/Footer';
import ScrollToTop from '../components/ScrollToTop.jsx';
// ----------------------------------------------------------------------

PageBilling.propTypes = {
    classOption: PropTypes.string,
    jwt: PropTypes.string.isRequired
};

PageBilling.defaultProps = {
    classOption: "section section-padding-t90 section-padding-bottom"
};

export default function PageBilling({jwt, classOption}) {

    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        gap: '20px'
    };

    const {
        data: urlPaymentManagementUrl,
        isLoading: isLoadingManagement,
        error: errorManagement
    } = useQuery(['paymentMethodManagement', jwt], () => getPaymentMethodManagement(jwt));

    const showThisPage = () => {
        // Loading state
        if (isLoadingManagement || !urlPaymentManagementUrl) {
            return <ThreeDotWave size="10rem" color="#123abc" />;
        }
    
        // Error state
        if (errorManagement) {
            return <div>Error: {errorManagement.message}</div>; // Removed the unnecessary optional chaining
        }
    
        // Checking for status code directly as it's already ensured that urlPaymentManagementUrl is not falsy
        if (urlPaymentManagementUrl.status_code !== 200) {
            return <div>Error: {urlPaymentManagementUrl.status_code} {urlPaymentManagementUrl?.message} </div>;
        }
    
        // If status code is 200, redirect
        window.location.href = urlPaymentManagementUrl.url;
    }
    
    return (
        <React.Fragment>
            <SEO title="SARACOTI || Billings"/>
            <Header/>
            <Breadcrumb image="images/bg/breadcrumb-bg-three.jpg" title="Best AI for your business" content="Home" contentTwo="Main"/>
            <div className={`section section-padding-t90 section-padding-bottom ${classOption}`}>
              <div style={containerStyle}>
                { showThisPage() }
              </div>
            </div>
            <Footer/>
            <ScrollToTop/>
        </React.Fragment>
    );
}





// import React from 'react';
// import PropTypes from 'prop-types';

// // components
// import SEO from '../components/SEO';
// import Header from "../partials/header/Header";
// import Breadcrumb from '../container/Breadcrumb/Breadcrumb';
// import Footer from '../container/Footer/Footer';
// import ScrollToTop from '../components/ScrollToTop.jsx';
// import SubscriptionPopup from '../components/Techniques/SubscriptionPopup.jsx';
// import PaymentMethodPopup from '../components/Techniques/PaymentMethodPopup.jsx';
// // ----------------------------------------------------------------------

// PageBilling.propTypes = {
//     classOption: PropTypes.string,
//     jwt: PropTypes.string.isRequired
// };

// PageBilling.defaultProps = {
//     classOption: "section section-padding-t90 section-padding-bottom"
// };

// export default function PageBilling({jwt, classOption}) {
//     const containerStyle = {
//         display: 'flex',
//         justifyContent: 'center',
//         gap: '20px'
//     };

//     return (
//         <React.Fragment>
//             <SEO title="SARACOTI || Billings"/>
//             <Header/>
//             <Breadcrumb image="images/bg/breadcrumb-bg-three.jpg" title="Best AI for your business" content="Home" contentTwo="Main"/>
//             <div className={`section section-padding-t90 section-padding-bottom ${classOption}`}>
//               <div style={containerStyle}>
//                 <SubscriptionPopup jwt={jwt} />
//                 <PaymentMethodPopup jwt={jwt} />
//               </div>
//             </div>
//             <Footer/>
//             <ScrollToTop/>
//         </React.Fragment>
//     );
// }