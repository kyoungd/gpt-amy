import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Icon } from '@iconify/react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../ui/button';
import paperPlaneOutline from '@iconify/icons-eva/paper-plane-outline';
import arrowBackOutline from '@iconify/icons-eva/arrow-back-outline';

const ServiceDetail = ({ jwtToken }) => {
    const [settings, setSettings] = useState(null);

    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.serviceData) {
            setSettings(location.state.serviceData.attributes);
        } else {
            const fetchData = async () => {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/installations/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${jwtToken}`,
                    },
                });
                setSettings(response.data.data);
            };
            fetchData();
        }
    }, [id, jwtToken, location]);

    const handleBack = () => {
        setTimeout(() => navigate(-1), 500);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = `${process.env.REACT_APP_BACKEND_URL}/api/installations/${id}`;
            await axios.put(url, settings, {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`,
                    'Content-Type': 'application/json'
                }
            });
            alert('Settings updated successfully!');
        } catch (error) {
            console.error('Error updating settings:', error);
            alert('Error updating settings. Please try again.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSettings((prevSettings) => ({ ...prevSettings, [name]: value }));
    };

    const dataForm = () => (
        <form onSubmit={handleSubmit} className="space-y-4">

            <div>
                <label htmlFor="product_type" className="block text-sm font-medium mb-1">Product Type</label>
                <input
                    type="text"
                    id="product_type"
                    name="product_type"
                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                    value={settings.product_type}
                    onChange={handleInputChange}
                    readOnly
                    disabled
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="contact_name" className="block text-sm font-medium mb-1">Contact Name</label>
                    <input
                        type="text"
                        id="contact_name"
                        name="contact_name"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={settings.contact_name}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="contact_phone" className="block text-sm font-medium mb-1">Contact Phone</label>
                    <input
                        type="text"
                        id="contact_phone"
                        name="contact_phone"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={settings.contact_phone}
                        onChange={handleInputChange}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="contact_email" className="block text-sm font-medium mb-1">Contact Email</label>
                    <input
                        type="email"
                        id="contact_email"
                        name="contact_email"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={settings.contact_email}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="twilio_phone" className="block text-sm font-medium mb-1">Service Phone (We will create one)</label>
                    <input
                        type="text"
                        id="twilio_phone"
                        name="twilio_phone"
                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                        value={settings.twilio_phone}
                        onChange={handleInputChange}
                        readOnly
                        disabled
                    />
                </div>
            </div>
            <div>
                <label htmlFor="shared_storage_link" className="block text-sm font-medium mb-1">Shared Storage Link (Upload your contents to this cloud folder)</label>
                <input
                    type="text"
                    id="shared_storage_link"
                    name="shared_storage_link"
                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                    value={settings.shared_storage_link}
                    onChange={handleInputChange}
                    readOnly
                    disabled
                />
            </div>

            <div>
                <label htmlFor="introduction_message" className="block text-sm font-medium mb-1">Introduction Message</label>
                <textarea
                    id="introduction_message"
                    name="introduction_message"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    rows="4"
                    value={settings.introduction_message}
                    onChange={handleInputChange}
                />
            </div>

            <div className="flex items-center space-x-2">
                <input
                    type="checkbox"
                    id="is_content_upload_complete"
                    name="is_content_upload_complete"
                    checked={settings.is_content_upload_complete}
                    onChange={(e) => {
                        setSettings((prevSettings) => ({
                            ...prevSettings,
                            is_content_upload_complete: e.target.checked,
                        }));
                    }}
                />
                <label htmlFor="is_content_upload_complete" className="text-sm">Content Upload - Check this box when you are done uploading your content.</label>
            </div>

            <div className="flex items-center space-x-2">
                <input
                    type="checkbox"
                    id="is_create_template_file"
                    name="is_create_template_file"
                    checked={settings.is_create_template_file}
                    onChange={(e) => {
                        setSettings((prevSettings) => ({
                            ...prevSettings,
                            is_create_template_file: e.target.checked,
                        }));
                    }}
                    readOnly
                    disabled
                />
                <label htmlFor="is_create_template_file" className="text-sm text-gray-600">Create Template File - We will create one for you.</label>
            </div>

            <div className="flex items-center space-x-2">
                <input
                    type="checkbox"
                    id="is_update_phone_server"
                    name="is_update_phone_server"
                    checked={settings.is_update_phone_server}
                    onChange={(e) => {
                        setSettings((prevSettings) => ({
                            ...prevSettings,
                            is_update_phone_server: e.target.checked,
                        }));
                    }}
                    readOnly
                    disabled
                />
                <label htmlFor="is_update_phone_server" className="text-sm text-gray-600">Phone Server - We will create one for you.</label>
            </div>

            <div className="flex items-center space-x-2">
                <input
                    type="checkbox"
                    id="is_live"
                    name="is_live"
                    checked={settings.is_live}
                    onChange={(e) => {
                        setSettings((prevSettings) => ({
                            ...prevSettings,
                            is_live: e.target.checked,
                        }));
                    }}
                    readOnly
                    disabled
                />
                <label htmlFor="is_live" className="text-sm text-gray-600">Live Mode - This will be checked when your AI is live.</label>
            </div>

            <div className="flex justify-center py-3">
                <div className="flex justify-between space-x-4 w-full max-w-md">
                    <Button variant="secondary" onClick={handleBack}>
                        <Icon icon={arrowBackOutline} />{' '}
                        Back
                    </Button>
                    <Button variant="default" type="submit">
                        <Icon icon={paperPlaneOutline} />{' '}
                        Save
                    </Button>
                </div>
            </div>

        </form>
    );

    return (
        <div className="section section-padding-top section-padding-bottom-150">
            <div className="container mx-auto px-4">
                <div className="w-full mb-6">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl font-bold mb-2">SERVICE SUBSCRIPTIONS</h2>
                        <p className="mb-6">
                            List of all service setup steps.
                        </p>
                        <div>
                            {settings && dataForm()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

ServiceDetail.propTypes = {
    jwtToken: PropTypes.string.isRequired
};

export default ServiceDetail;
