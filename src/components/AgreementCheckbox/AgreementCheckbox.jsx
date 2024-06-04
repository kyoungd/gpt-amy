import React, { useRef, useEffect, useState } from 'react';
import PropTypes from "prop-types";
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SectionTitle from '../SectionTitles/SectionTitle';
import Parallax from 'parallax-js';
import { createSubscription } from '../../utils/stripe-subscriptions';
import IconBoxData from '../../data/iconBox/icon-box.json';

const subscribeNow = async (token, subscriptionPriceId, setupPriceId) => {
    try {
        if (!token) {
            throw new Error('No token provided');
        }
        const data = await createSubscription(token, subscriptionPriceId, setupPriceId);
        window.open(data.attributes.url);
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

const AgreementCheckbox = ({ token, id, classOption }) => {
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [privacyAccepted, setPrivacyAccepted] = useState(false);
    const [saasAccepted, setSaasAccepted] = useState(false);
    const [consultingAccepted, setConsultingAccepted] = useState(false);

    const navigate = useNavigate();

    const data = IconBoxData.filter(iconbox => iconbox.id === id)[0];

    const sceneEl = useRef(null);
    useEffect(() => {
        const parallaxInstance = new Parallax(sceneEl.current, {
        relativeInput: true,
        })
        
        parallaxInstance.enable();

        return () => parallaxInstance.disable();

    }, [])

    const handleCancel = () => {
        navigate(-1);
    };

    const handleNext = async () => {
        await subscribeNow(token, data.stripeSubscriptionPriceId, data.stripeSetupPriceId);
    };

    return (
        <div className={`section section-padding-t90 section-padding-bottom ${classOption}`}>
            <div className="container">

                <SectionTitle
                    headingOption="fz-32"
                    title="Agreements"
                    subTitle="Please read and agree to these terms."
                />

                <div className="row icon-box-shape-animation">
                    <div className="p-3 preformatted-text" >
                        <Form.Group className="mb-3">
                            <Form.Check
                            className="standout-checkbox"
                            type="checkbox"
                            label={
                                <span>
                                {' '}Review the{' '}
                                <a
                                    href="/terms"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ textDecoration: 'underline' }}
                                >
                                    terms and conditions
                                </a>{' '}
                                and mark the checkbox below to indicate your acceptance of them.
                                </span>
                            }
                            checked={termsAccepted}
                            onChange={(e) => setTermsAccepted(e.target.checked)}
                            />

                            <Form.Check
                            className="standout-checkbox"
                            type="checkbox"
                            label={
                                <span>
                                {' '}Review the{' '}
                                <a
                                    href="/privacy"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ textDecoration: 'underline' }}
                                >
                                    privacy policy
                                </a>{' '}
                                and mark the checkbox below to indicate your acceptance of them.
                                </span>
                            }
                            checked={privacyAccepted}
                            onChange={(e) => setPrivacyAccepted(e.target.checked)}
                            />

                            <Form.Check
                            className="standout-checkbox"
                            type="checkbox"
                            label={
                                <span>
                                {' '}Review the{' '}
                                <a
                                    href="/saas"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ textDecoration: 'underline' }}
                                >
                                    software as a service policy
                                </a>{' '}
                                and mark the checkbox below to indicate your acceptance of them.
                                </span>
                            }
                            checked={saasAccepted}
                            onChange={(e) => setSaasAccepted(e.target.checked)}
                            />

                            <Form.Check
                            className="standout-checkbox"
                            type="checkbox"
                            label={
                                <span>
                                {' '}Review the{' '}
                                <a
                                    href="/consulting"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ textDecoration: 'underline' }}
                                >
                                    software consulting policy
                                </a>{' '}
                                and mark the checkbox below to indicate your acceptance of them.
                                </span>
                            }
                            checked={consultingAccepted}
                            onChange={(e) => setConsultingAccepted(e.target.checked)}
                            />
                        </Form.Group>

                        <div className="text-center mt-6">
                            <Button
                            className="me-2"
                            variant="secondary"
                            onClick={handleCancel}
                            >
                            Cancel
                            </Button>
                            <Button
                                variant={termsAccepted && privacyAccepted && saasAccepted && consultingAccepted ? 'primary' : 'light'}
                                disabled={!termsAccepted || !privacyAccepted || !saasAccepted || !consultingAccepted}
                                onClick={async () => {
                                    try {
                                        await handleNext();
                                    } catch (error) {
                                        console.error(error);
                                    }
                                }}                            >
                                Next
                            </Button>
                        </div>                        
                    </div>
                    <div className="shape shape-1" id="scene" ref={sceneEl}>
                        <span data-depth="1"><img src={process.env.PUBLIC_URL + "/images/shape-animation/video-shape-1.png"} alt="" /></span>
                    </div>

                </div>

            </div>
        </div>
    );
};


AgreementCheckbox.propTypes = {
    token: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    classOption: PropTypes.string
};

AgreementCheckbox.defaultProps = {
    classOption: "section section-padding-t90 section-padding-bottom"
};

export default AgreementCheckbox;

