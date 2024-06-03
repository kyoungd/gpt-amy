import {useState, useEffect, useRef} from "react";
import PropTypes from "prop-types";
import SectionTitle from '../SectionTitles/SectionTitle';
import SectionTitleTwo from '../SectionTitles/SectionTitleTwo';
import Tilt from 'react-parallax-tilt';
import Parallax from 'parallax-js';
// import {Link} from "react-router-dom";

const HomeAbout = ({ refSectionLearnMore }) => {
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
        <div className="section section-padding-t90 section-padding-bottom-200" ref={refSectionLearnMore} >
            <div className="container">

                <SectionTitle
                    title="Grow Business"
                    subTitle="Leap ahead of the competition with our AI solutions"
                />

                <div className="row">

                    
                    <div className="col-xl-7 col-lg-6 col-12" data-aos="fade-up">
                        <div className="about-image-area">
                            <div className="about-image">
                                <Tilt scale={scale} transitionSpeed={4000}>
                                    <img src={process.env.PUBLIC_URL + "images/about/home-one-about/home_agency_about_1b.jpg"} alt="" />
                                </Tilt>
                            </div>
                        
                            <div className="about-image">
                                <Tilt scale={scale} transitionSpeed={4000}>
                                    <img src={process.env.PUBLIC_URL + "images/about/home-one-about/home_agency_about_2b.jpg"} alt="" />
                                </Tilt>
                            </div>
                            <div className="shape shape-1" id="scene" ref={sceneEl}>
                                <span data-depth="1"><img src={process.env.PUBLIC_URL + "images/shape-animation/about-shape-1.png"} alt="" /></span>
                            </div>

                        </div>
                    </div>

                    <div className="col-xl-5 col-lg-6 col-12" data-aos="fade-up" data-aos-delay="300">
                        <div className="about-content-area">
                            <SectionTitleTwo 
                                subTitle="Every day brings new challenges"
                                title="Increase ROI with safety of CLOSED LOOP AI"
                            />
                            <p>Let us show you how you can grow your business and provide better service while lowering your overhead using our amazing AI tool. Let us help you increase your ROI with safety of CLOSED LOOP AI that integrates seemlessly with your operation.</p>

                            {/* <Link className="btn btn-primary btn-hover-secondary mt-xl-8 mt-lg-8 mt-md-6 mt-4" to={process.env.PUBLIC_URL + "/ai-receptionist"}>TALK TO AMY</Link> */}

                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

HomeAbout.propTypes = {
    refSectionLearnMore: PropTypes.object
};

export default HomeAbout;
