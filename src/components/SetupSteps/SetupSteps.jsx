import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import InstallationBlocks from './InstallationBlocks';

const SetupSteps = ({ jwtToken }) => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/installations`, {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`,
                },
            });

            setServices(response.data.data);
        };
        fetchData();
    }, [jwtToken]);

    return (
        <InstallationBlocks services={services} />
    );
};

SetupSteps.propTypes = {
    jwtToken: PropTypes.string.isRequired
};

export default SetupSteps;
