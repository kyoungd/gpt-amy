import {useState, useEffect, useRef} from "react";
import SectionTitleTwo from '../../components/SectionTitles/SectionTitleTwo';
import {useParams, useNavigate} from "react-router-dom";
import Tilt from 'react-parallax-tilt';
import Parallax from 'parallax-js';
import ContactForm from '../../components/ContactForm/ContactForm'
import PropTypes from 'prop-types';
import { setStatusAfterSubscription } from '../../components/UserContext';

const AboutSeven = ( { jwt }) => {
    const { id } = useParams();
    const [scale] = useState(1.04);
    const sceneEl = useRef(null);

    const navigate = useNavigate();
    useEffect(() => {
        // Immediately Invoked Function Expression (IIFE) to handle the async function
        (async () => {
            if (id) { // This check ensures 'id' is not null (or any falsy value)
                await setStatusAfterSubscription();
                navigate('/contact', { replace: true, state: { forceRefresh: true } });
                // Use setTimeout to ensure navigation has time to initiate
                setTimeout(() => window.location.reload(), 0);
            }
        })();
    }, [id]); // Including 'id' in the dependencies list to react to its changes
    
    useEffect(() => {
        const parallaxInstance = new Parallax(sceneEl.current, {
        relativeInput: true,
        })
        
        parallaxInstance.enable();

        return () => parallaxInstance.disable();

    }, [])
    return (
        <div className="section section-padding-top section-padding-bottom-180">
            <div className="container">

                <div className="row">

                    <div className="col-xl-7 col-lg-6 col-12" data-aos="fade-up">
                        <div className="about-image-area">
                            <div className="about-image">
                                <Tilt scale={scale} transitionSpeed={4000}>
                                    <img src={process.env.PUBLIC_URL + "../images/about/about-3.jpg"} alt="" />
                                </Tilt>
                            </div>
                            <div className="about-image">
                                <Tilt scale={scale} transitionSpeed={4000}>
                                    <img src={process.env.PUBLIC_URL + "../images/about/about-4.jpg"} alt="" />
                                </Tilt>
                            </div>

                            <div className="shape shape-1" id="scene" ref={sceneEl}>
                                <span data-depth="1"><img src={process.env.PUBLIC_URL + "../images/shape-animation/about-shape-1.png"} alt="" /></span>
                            </div>

                        </div>
                    </div>

                    <div className="col-xl-5 col-lg-6 col-12" data-aos="fade-up" data-aos-delay="300">
                        <div className="about-content-area">
                            <SectionTitleTwo 
                                subTitle="ASK US ANYTHING"
                                title="Enter your request"
                            />

                            <ContactForm jwt={ jwt } />

                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

AboutSeven.propTypes = {
    jwt: PropTypes.string
};
   
export default AboutSeven;
