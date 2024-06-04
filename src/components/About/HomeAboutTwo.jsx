import {useState, useEffect, useRef} from "react";
import PropTypes from "prop-types";
import SectionTitleTwo from '../SectionTitles/SectionTitleTwo';
import Tilt from 'react-parallax-tilt';
import Parallax from 'parallax-js';

const HomeAboutTwo = ({ refSectionLearnMore }) => {
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
        <div className="section section-padding-top section-padding-bottom-150" ref={refSectionLearnMore} >
            <div className="container">

                <div className="row">

                    <div className="col-xl-6 col-lg-6 col-12" data-aos="fade-up">
                        <div className="about-content-area mt-0 mb-md-10 mb-10">
                            <SectionTitleTwo 
                                subTitle="Advanced AI for customer service"
                                title="Easy to setup, fully customized, and reliable AI."
                            />

                            <div className="row mb-n6">
                                <div className="col-md-5 col-sm-6 col-12 mb-6">
                                    <div className="about-funfact">
                                        <h6 className="text">Happy Clients</h6>
                                        <p>Enhance customer satisfaction with our AI, which delivers quick and accurate responses to all inquiries.</p>
                                    </div>
                                </div>
                                <div className="col-md-5 col-sm-6 col-12 mb-6">
                                    <div className="about-funfact">
                                        <h6 className="text">Natural interaction</h6>
                                        <p>Our cutting-edge AI uses natural language processing to listen and respond to customer inquiries, ensuring a seamless and intuitive interaction experience.</p>
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

HomeAboutTwo.propTypes = {
    refSectionLearnMore: PropTypes.object,
}

export default HomeAboutTwo;
