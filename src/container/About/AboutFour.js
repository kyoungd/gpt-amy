import {useState, useEffect, useRef} from "react";
import SectionTitleTwo from '../../components/SectionTitles/SectionTitleTwo';
import Tilt from 'react-parallax-tilt';
import Parallax from 'parallax-js';
import CountUp from 'react-countup';
import VisibilitySensor from "react-visibility-sensor";
import PropTypes from 'prop-types';
import ThreeDotWave from "../../components/Work/ThreeDotWave";
import Button from 'react-bootstrap/Button';

// import TestimonialContainer from '../container/Testimonial/TestimonialContainer';
// import CallToActionTwo from '../container/CallToAction/CallToActionTwo';

AboutFour.propTypes = {
    activeLink: PropTypes.string.isRequired
};


export default function AboutFour ({ activeLink }) {
    const [copySuccess, setCopySuccess] = useState('');

    const copyToClipboard = () => {
      const scriptTag = `<script src="https://2human.ai/widget.js" data-token="${activeLink}"></script>`;
      navigator.clipboard.writeText(scriptTag).then(() => {
        setCopySuccess('Copied!');
        setTimeout(() => setCopySuccess(''), 2000); // Clear message after 2 seconds
      }, () => {
        setCopySuccess('Failed to copy');
      });
    };

    const [didViewCountUp, setDidViewCountUp] = useState(false);
    const onVisibilityChange = isVisible => {
        if (isVisible) {
        setDidViewCountUp(true);
        }
    };
    const [scale] = useState(1.04);
    const sceneEl = useRef(null);
    useEffect(() => {
        const parallaxInstance = new Parallax(sceneEl.current, {
        relativeInput: true,
        })
        
        parallaxInstance.enable();

        return () => parallaxInstance.disable();

    }, [])
    return (
        <div className="section section-padding-top about-section-padding-bottom-200">
            <div className="container">
                <div className="row">

                    <div className="col-xl-6 col-lg-6 col-12" data-aos="fade-up">
                        <div className="about-content-area mt-0 mb-md-10 mb-10">
                            <SectionTitleTwo 
                                subTitle="Let's get started."
                                title="Set up Amy just for you."
                            />
                            <div className="row row-cols-sm-2 row-cols-auto mb-n6">
                                <div className="col mb-6">
                                    <div className="about-funfact">
                                        <div className="number">
                                            <VisibilitySensor
                                                    onChange={onVisibilityChange}
                                                    offset={{ top: 10 }}
                                                    delayedCall
                                                    >
                                                    <CountUp end={didViewCountUp ? 110 : 0} />
                                            </VisibilitySensor>
                                        </div>
                                        <h6 className="text">Chatbot</h6>
                                        <p>Add this code to the <script /> section of your index html file or root file.</p>
                                        { !activeLink ?? <ThreeDotWave /> }
                                        {activeLink && (
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
                                    </div>
                                </div>
                                <div className="col mb-6">
                                    <div className="about-funfact">
                                        <div className="number">
                                            <VisibilitySensor
                                                onChange={onVisibilityChange}
                                                offset={{ top: 10 }}
                                                delayedCall
                                                >
                                                <CountUp end={didViewCountUp ? 130 : 0} />
                                            </VisibilitySensor>+
                                        </div>
                                        <h6 className="text">Immedidate and Competent</h6>
                                        <p>Instantly address customer inquiries without the need for specialized personnel. Our latest AI technology can now perform numerous tasks at a human-level competency. </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-12" data-aos="fade-up" data-aos-delay="300">
                        <div className="about-image-area about-shape-animation right-0 me-0">
                            <div className="about-image js-tilt">
                                <Tilt scale={scale} transitionSpeed={4000}>
                                    <img src={process.env.PUBLIC_URL + "images/about/about-1.jpg"} alt="" />
                                </Tilt>
                            </div>
                            <div className="about-image js-tilt">
                                <Tilt scale={scale} transitionSpeed={4000}>
                                    <img src={process.env.PUBLIC_URL + "images/about/about-2.jpg"} alt="" />
                                </Tilt>
                            </div>
                            <div className="shape shape-1" id="scene" ref={sceneEl}>
                                <span data-depth="1"><img src={process.env.PUBLIC_URL + "images/shape-animation/video-shape-1.png"} alt="" /></span>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}
