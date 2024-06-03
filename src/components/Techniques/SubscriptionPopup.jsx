import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getSubscriptionManagement } from '../../utils/stripe-subscriptions';
import ThreeDotWave from '../Work/ThreeDotWave';

SubscriptionPopup.propTypes = {
    jwt: PropTypes.string.isRequired
};

export default function SubscriptionPopup({ jwt }) {

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
        data: urlSubscriptionManagement,
        isLoading: isLoadingManagement,
        error: errorManagement
    } = useQuery(['subscriptionManagement', jwt], () => getSubscriptionManagement(jwt));

    // Loading state
    if (isLoadingManagement) {
        return <ThreeDotWave />;
    }

    // Error state
    if (errorManagement) {
        return <div>Error: {errorManagement?.message}</div>;
    }

    if (urlSubscriptionManagement && urlSubscriptionManagement.status_code !== 200)
        return (
            <Link
                className="btn btn-secondary btn-hover-primary mt-xl-8 mt-lg-8 mt-md-6 mt-4"
                style={responsiveSquareButtonStyle}>
                {urlSubscriptionManagement.message}
            </Link>
        );

    if (urlSubscriptionManagement)
        return (
            <Link
                className="btn btn-primary btn-hover-secondary mt-xl-8 mt-lg-8 mt-md-6 mt-4"
                to={urlSubscriptionManagement.url}
                style={responsiveSquareButtonStyle}>
                Your Subscriptions
            </Link>
        );
}
