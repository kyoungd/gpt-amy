import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Badge, Card } from 'react-bootstrap';
import SEO from '../components/SEO.jsx';
import ChatbotInterface from '../components/ChatbotInterface/ChatbotInterface.jsx';
import Header from "../partials/header/Header.jsx";
import Footer from '../container/Footer/Footer.js';
import ScrollToTop from '../components/ScrollToTop.jsx';
import PropTypes from 'prop-types';
import ChatbotDemo from '../components/ChatbotDemo/ChatbotDemo.jsx';
import dataApointment from '../data/demo/appointment.json';
import dataCarPart from "../data/demo/carpart.json";
import dataTireStore from "../data/demo/tirestore.json";
import dataTrialOffer from "../data/demo/trialoffer.json";
import dataCompliance from "../data/demo/compliance.json";
import dataStarrco from "../data/demo/starrco.json";
import '../assets/css/custom.css';

function getData(title) {
    switch (title) {
        case 'appointment':
            return dataApointment;
        case 'car parts':
            return dataCarPart;
        case 'tire store':
            return dataTireStore;
        case 'trial offer':
            return dataTrialOffer;
        case 'compliance':
            return dataCompliance;
        case 'starrco':
            return dataStarrco; // Assuming no data available for Starrco, adjust as necessary
        default:
            return [];
    }
}

const PageAi = ({ id, title }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [fadeIn, setFadeIn] = useState(false);
    const data = getData(title);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
            setFadeIn(true);
        }, 300);
        return () => clearTimeout(timer);
    }, []);

    const titleFormatted = title ? title.charAt(0).toUpperCase() + title.slice(1).replace(/([A-Z])/g, ' $1') : 'AI Demo';
    const demoCount = data ? data.length : 0;

    const pageStyles = {
        aiContainer: {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            minHeight: '100vh',
            position: 'relative',
            overflow: 'hidden'
        },
        heroSection: {
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 100%)',
            padding: '4rem 0',
            color: 'white',
            textAlign: 'center',
            position: 'relative',
            zIndex: 2
        },
        heroTitle: {
            fontSize: '3.5rem',
            fontWeight: '700',
            marginBottom: '1rem',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            opacity: fadeIn ? 1 : 0,
            transform: fadeIn ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s ease-out'
        },
        heroSubtitle: {
            fontSize: '1.3rem',
            marginBottom: '2rem',
            opacity: fadeIn ? 0.9 : 0,
            transform: fadeIn ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s ease-out 0.2s'
        },
        statsCard: {
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '15px',
            padding: '1.5rem',
            color: 'white',
            textAlign: 'center',
            opacity: fadeIn ? 1 : 0,
            transform: fadeIn ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s ease-out 0.4s'
        },
        mainContent: {
            backgroundColor: '#f8f9fa',
            minHeight: '70vh',
            position: 'relative',
            zIndex: 1,
            paddingTop: '3rem',
            paddingBottom: '3rem'
        },
        demoSection: {
            background: 'white',
            borderRadius: '20px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            padding: '2rem',
            marginBottom: '3rem',
            opacity: fadeIn ? 1 : 0,
            transform: fadeIn ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease-out 0.6s'
        },
        chatSection: {
            background: 'white',
            borderRadius: '20px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            overflow: 'hidden',
            opacity: fadeIn ? 1 : 0,
            transform: fadeIn ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease-out 0.8s',
            maxWidth: '100%',
            boxSizing: 'border-box'
        },
        sectionTitle: {
            fontSize: '2rem',
            fontWeight: '600',
            color: '#2c3e50',
            marginBottom: '1.5rem',
            textAlign: 'center'
        },
        floatingElements: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 1
        },
        loadingOverlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            opacity: isLoading ? 1 : 0,
            visibility: isLoading ? 'visible' : 'hidden',
            transition: 'opacity 0.3s ease-out, visibility 0.3s ease-out'
        },
        spinner: {
            width: '50px',
            height: '50px',
            border: '5px solid #f3f3f3',
            borderTop: '5px solid #667eea',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
        }
    };

    return (
        <React.Fragment>
            <SEO title={`OYATE || ${titleFormatted} AI Demo`} />
            <Header />
            
            {/* Loading Overlay */}
            <div style={pageStyles.loadingOverlay}>
                <div style={pageStyles.spinner}></div>
            </div>

            <div style={pageStyles.aiContainer}>
                {/* Hero Section */}
                <div style={pageStyles.heroSection}>
                    <div style={pageStyles.floatingElements}>
                        {/* Floating geometric shapes */}
                        <div style={{
                            position: 'absolute',
                            top: '10%',
                            right: '10%',
                            width: '100px',
                            height: '100px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: '50%',
                            animation: 'float 6s ease-in-out infinite'
                        }}></div>
                        <div style={{
                            position: 'absolute',
                            bottom: '20%',
                            left: '15%',
                            width: '80px',
                            height: '80px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            transform: 'rotate(45deg)',
                            animation: 'float 8s ease-in-out infinite reverse'
                        }}></div>
                    </div>
                    
                    <Container>
                        <Row className="justify-content-center">
                            <Col lg={8}>
                                <h1 style={pageStyles.heroTitle}>
                                    {titleFormatted} AI Assistant
                                </h1>
                                <p style={pageStyles.heroSubtitle}>
                                    Experience the power of AI-driven conversations tailored for {title} scenarios
                                </p>
                                <Row className="justify-content-center mt-4">
                                    <Col md={4}>
                                        <Card style={pageStyles.statsCard}>
                                            <Card.Body>
                                                <h3>{demoCount}</h3>
                                                <p>Demo Scenarios</p>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col md={4}>
                                        <Card style={pageStyles.statsCard}>
                                            <Card.Body>
                                                <h3>AI</h3>
                                                <p>Powered Assistant</p>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </div>

                {/* Main Content */}
                <div style={pageStyles.mainContent}>
                    <Container>
                        <Row>
                            <Col lg={12}>
                                {/* Demo Section */}
                                {data && data.length > 0 && (
                                    <div style={pageStyles.demoSection}>
                                        <h2 style={pageStyles.sectionTitle}>
                                            <Badge bg="primary" className="me-2">Demo</Badge>
                                            Sample Conversations
                                        </h2>
                                        <ChatbotDemo chatData={data} classOption="" />
                                    </div>
                                )}

                                {/* Chat Interface Section */}
                                <div style={pageStyles.chatSection}>
                                    <div style={{ padding: '2rem' }}>
                                        <h2 style={pageStyles.sectionTitle}>
                                            <Badge bg="success" className="me-2">Live</Badge>
                                            Interactive Chat
                                        </h2>
                                    </div>
                                    <ChatbotInterface key={title} title={title} id={id} />
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>

            <Footer />
            <ScrollToTop />
            
            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                
                .fade-in {
                    opacity: 0;
                    transform: translateY(30px);
                    transition: all 0.8s ease-out;
                }
                
                .fade-in.visible {
                    opacity: 1;
                    transform: translateY(0);
                }
            `}</style>
        </React.Fragment>
    )
}

PageAi.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
};

PageAi.defaultProps = {
    title: "AI"
};

export default PageAi;