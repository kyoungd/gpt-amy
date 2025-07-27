import {useState, useEffect, useRef} from "react";
import SectionTitleTwo from '../SectionTitles/SectionTitleTwo';
import Tilt from 'react-parallax-tilt';
import Parallax from 'parallax-js';
import {Link} from 'react-router-dom';

const HomeSuccess = () => {
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
        <div className="section section-padding-top success-section-padding-bottom-180">
            <div className="container">
                <div className="flex flex-wrap">

                    <div className="w-full lg:w-5/12 lg:ml-[8.333333%]" data-aos="fade-up" data-aos-delay="300">
                        <div className="success-content lg:mt-0 md:mt-50 sm:mt-50 mt-40">
                            <div className="about-content-area">
                                <SectionTitleTwo 
                                    subTitle="Every day brings new challenges"
                                    title="Let Penny help you achieve your goals."
                                />
                                <p>Discover the capabilities of our AI Answers system, Penny. Available 24/7, she will answer any inquiries regarding your company, special offers, products, and services, ensuring a consistent sales and marketing presence.</p>

                                <Link className="btn btn-primary btn-hover-secondary xl:mt-8 lg:mt-8 md:mt-6 mt-4" to={process.env.PUBLIC_URL + "/demo-qa"}>TALK TO PENNY</Link>
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2" data-aos="fade-up">
                        <div className="about-image-area right-0 skill-image-area">
                            <div className="about-image js-tilt">
                                <Tilt scale={scale} transitionSpeed={4000}>
                                    <img src={process.env.PUBLIC_URL + "images/skill/skill-1.jpg"} alt=""/>
                                </Tilt>
                            </div>
                            <div className="about-image js-tilt">
                                <Tilt scale={scale} transitionSpeed={4000}>
                                    <img src={process.env.PUBLIC_URL + "images/skill/skill-2.jpg"} alt=""/>
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



export default HomeSuccess;
