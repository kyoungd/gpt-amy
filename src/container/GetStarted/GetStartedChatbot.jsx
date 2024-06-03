import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import ThreeDotWave from '../../components/Work/ThreeDotWave';
import { useQuery, useMutation } from "react-query";
import axios from "axios";

const GetStartedChatbox = ({ jwt }) => {
    const [copySuccess, setCopySuccess] = useState('');
    const [forceApiCall, setForceApiCall] = useState(true);
    const [activeLink, setActiveLink] = useState('');
    const [isChatbotActive, setIsChatbotActive] = useState(false);

    const { isSuccess, isLoading, isError, error } = useQuery('about-me', async () => {
        const baseUrl = process.env.REACT_APP_BACKEND_URL;
        const url = `${baseUrl}/api/subscriptions/active`;
    
        const response = await axios.get(url, { headers: { 'Authorization': `Bearer ${jwt}` } });
        return response.data;
    }, {
        enabled: !!forceApiCall,
        onSuccess: (data) => {
            const external_id = data.data[0].attributes.subscription_external_id;
            setActiveLink(external_id);
            setForceApiCall(false);
        },
        onError: (error) => {
            setActiveLink(error.message);
            console.error('An error occurred:', error);
        }
    });

    const chatbotQuery = useQuery('chatbot-active', async () => {
        const baseUrl = process.env.REACT_APP_BACKEND_URL;
        const url = `${baseUrl}/api/customer-chatbot-sites/is-active`;

        const response = await axios.get(url, { headers: { 'Authorization': `Bearer ${jwt}` } });
        return response?.data?.data?.attributes?.is_chatbot_active;
    }, {
        onSuccess: setIsChatbotActive
    });

    const updateChatbotStatus = useMutation(async (isActive) => {
        const baseUrl = process.env.REACT_APP_BACKEND_URL;
        const url = `${baseUrl}/api/customer-chatbot-sites/is-active`;
        await axios.put(url, { is_chatbot_active: isActive }, {
            headers: { 'Authorization': `Bearer ${jwt}` }
        });
    });

    const handleChatbotCheckboxChange = (e) => {
        const newStatus = e.target.checked;
        setIsChatbotActive(newStatus);
        updateChatbotStatus.mutate(newStatus);
    };

    const copyToClipboard = () => {
        const scriptTag = `<script src="https://2human.ai/widget.js" data-token="${activeLink}"></script>`;
        navigator.clipboard.writeText(scriptTag).then(() => {
            setCopySuccess('Copied!');
            setTimeout(() => setCopySuccess(''), 2000); // Clear message after 2 seconds
        }, () => {
            setCopySuccess('Failed to copy');
        });
    };

    return (
        <>
            {isLoading && <ThreeDotWave />}
            {isSuccess && activeLink && (
                <>
                    <p>
                        <code>
                        {'<script src="https://2human.ai/widget.js" data-token="' + activeLink + '"></script>'}
                        </code>
                    </p>
                    <Button variant="primary" onClick={copyToClipboard}>Copy to Clipboard</Button>
                    {copySuccess && <span style={{ marginLeft: '10px' }}>{copySuccess}</span>}
                </>
            )}
            {isError && <p>{error}</p>}
            {chatbotQuery.isSuccess && (
                <Form.Check 
                    type="checkbox"
                    label="Is Chatbot Active"
                    checked={isChatbotActive}
                    onChange={handleChatbotCheckboxChange}
                    style={{ marginTop: '10px' }}
                />
            )}
        </>
    );
}

GetStartedChatbox.propTypes = {
    jwt: PropTypes.string.isRequired
};

export default GetStartedChatbox;
