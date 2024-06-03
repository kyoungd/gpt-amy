import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Icon } from '@iconify/react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import paperPlaneOutline from '@iconify/icons-eva/paper-plane-outline';
import arrowBackOutline from '@iconify/icons-eva/arrow-back-outline';
import * as Sentry from "@sentry/react";

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
            Sentry.captureException(error);
            console.error('Error updating settings:', error);
            alert('Error updating settings. Please try again.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSettings((prevSettings) => ({ ...prevSettings, [name]: value }));
    };

    const dataForm = () => (
        <Form onSubmit={handleSubmit}>

            <Form.Group controlId="product_type">
                <Form.Label>Product Type</Form.Label>
                <Form.Control
                    type="text"
                    name="product_type"
                    value={settings.product_type}
                    onChange={handleInputChange}
                    readOnly
                    disabled
                />
            </Form.Group>

            <Row>
                <Col>
                    <Form.Group controlId="contact_name">
                        <Form.Label>Contact Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="contact_name"
                            value={settings.contact_name}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="contact_phone">
                        <Form.Label>Contact Phone</Form.Label>
                        <Form.Control
                            type="text"
                            name="contact_phone"
                            value={settings.contact_phone}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Form.Group controlId="contact_email">
                        <Form.Label>Contact Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="contact_email"
                            value={settings.contact_email}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="twilio_phone">
                        <Form.Label>Service Phone (We will create one)</Form.Label>
                        <Form.Control
                            type="text"
                            name="twilio_phone"
                            value={settings.twilio_phone}
                            onChange={handleInputChange}
                            readonly
                            disabled
                            />
                    </Form.Group>
                </Col>
            </Row>
            <Form.Group controlId="shared_storage_link">
                <Form.Label>Shared Storage Link (Upload your contents to this cloud folder)</Form.Label>
                <Form.Control
                    type="text"
                    name="shared_storage_link"
                    value={settings.shared_storage_link}
                    onChange={handleInputChange}
                    readonly
                    disabled
                />
            </Form.Group>

            <Form.Group controlId="introduction_message">
                <Form.Label>Introduction Message</Form.Label>
                <Form.Control
                    as="textarea"
                    name="introduction_message"
                    value={settings.introduction_message}
                    onChange={handleInputChange}
                />
            </Form.Group>

            <Form.Group controlId="is_content_upload_complete">
                <Form.Check
                    type="checkbox"
                    name="is_content_upload_complete"
                    label="Content Upload - Check this box when you are done uploading your content."
                    checked={settings.is_content_upload_complete}
                    onChange={(e) => {
                        setSettings((prevSettings) => ({
                            ...prevSettings,
                            is_content_upload_complete: e.target.checked,
                        }));
                    }}
                />
            </Form.Group>

            <Form.Group controlId="is_create_template_file">
                <Form.Check
                    type="checkbox"
                    name="is_create_template_file"
                    label="Create Template File - We will create one for you."
                    checked={settings.is_create_template_file}
                    onChange={(e) => {
                        setSettings((prevSettings) => ({
                            ...prevSettings,
                            is_create_template_file: e.target.checked,
                        }));
                    }}
                    readonly
                    disabled
                />
            </Form.Group>

            <Form.Group controlId="is_update_phone_server">
                <Form.Check
                    type="checkbox"
                    name="is_update_phone_server"
                    label="Phone Server - We will create one for you."
                    checked={settings.is_update_phone_server}
                    onChange={(e) => {
                        setSettings((prevSettings) => ({
                            ...prevSettings,
                            is_update_phone_server: e.target.checked,
                        }));
                    }}
                    readonly
                    disabled
                />
            </Form.Group>

            <Form.Group controlId="is_live">
                <Form.Check
                    type="checkbox"
                    name="is_live"
                    label="Live Mode - This will be checked when your AI is live."
                    checked={settings.is_live}
                    onChange={(e) => {
                        setSettings((prevSettings) => ({
                            ...prevSettings,
                            is_live: e.target.checked,
                        }));
                    }}
                    readonly
                    disabled
                />
            </Form.Group>

            <div className="container">
                <div className="row justify-content-center py-3">
                    <div className="col-12 col-md-6 d-flex justify-content-between">
                        <Button variant="secondary" className="me-2" onClick={handleBack}>
                            <Icon icon={arrowBackOutline} />{' '}
                            Back
                        </Button>
                        <Button variant="primary" type="submit">
                            <Icon icon={paperPlaneOutline} />{' '}
                            Save
                        </Button>
                    </div>
                </div>
            </div>

        </Form>
    );

    return (
        <div className="section section-padding-top section-padding-bottom-150">
            <div className="container">
                <div className="col-md-12 col-12 mb-6">
                    <Container>
                        <h2>SERVICE SUBSCRIPTIONS</h2>
                        <p>
                            List of all setvice setup steps.
                        </p>
                        <Row>
                            <Col>
                                {settings && dataForm()}
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </div>
    );
};

ServiceDetail.propTypes = {
    jwtToken: PropTypes.string.isRequired
};

export default ServiceDetail;
