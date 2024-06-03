import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getPaymentMethodManagement } from '../../utils/stripe-subscriptions';
import ThreeDotWave from '../Work/ThreeDotWave';

PaymentMethodPopup.propTypes = {
    jwt: PropTypes.string.isRequired
};

export default function PaymentMethodPopup({ jwt }) {

    const responsiveSquareButtonStyle = {
        width: '20vw', // width as a percentage of the viewport width
        height: '10vw', // height equal to the width to maintain square shape
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px', // Increased padding for better spacing
        fontSize: '1em', // Adjust font size as needed
        maxWidth: '300px', // Adjusted for potentially longer text
        maxHeight: '150px', // Adjusted for potentially longer text
        overflow: 'hidden', // Ensures text doesn't overflow
        textOverflow: 'ellipsis', // Adds ellipsis for overflowed text
        whiteSpace: 'nowrap', // Keeps text in a single line
        // Additional styles can be added here
    };
        
    const {
        data: urlPaymentManagementUrl,
        isLoading: isLoadingManagement,
        error: errorManagement
    } = useQuery(['paymentMethodManagement', jwt], () => getPaymentMethodManagement(jwt));

    // Loading state
    if (isLoadingManagement || !urlPaymentManagementUrl) {
        return <ThreeDotWave />;
    }

    // Error state
    if (errorManagement) {
        return <div>Error: {errorManagement?.message}</div>;
    }

    if (urlPaymentManagementUrl.status_code !== 200) {
        const buttonLabel = urlPaymentManagementUrl.message || 'No Payment Method on file.';
        return (
            <Link
                className="btn btn-secondary btn-hover-secondary mt-xl-8 mt-lg-8 mt-md-6 mt-4"
                style={responsiveSquareButtonStyle}>
                {buttonLabel}
            </Link>
        );
    }

    if (urlPaymentManagementUrl) {
        const buttonlabel2 = 'Your Payment Method';
        return (
            <Link
                className="btn btn-primary btn-hover-secondary mt-xl-8 mt-lg-8 mt-md-6 mt-4"
                to={urlPaymentManagementUrl.url}
                style={responsiveSquareButtonStyle}>
                {buttonlabel2}
            </Link>
        );
    }
}
