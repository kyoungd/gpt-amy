import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import Parallax from 'parallax-js';
import ModalVideo from "react-modal-video";

const HomeAboutThree = ({ refSectionLearnMore }) => {
    const [isOpen, setOpen] = useState(false)
    const sceneEl = useRef(null);
    useEffect(() => {
        const parallaxInstance = new Parallax(sceneEl.current, {
        relativeInput: true,
        })
        
        parallaxInstance.enable();

        return () => parallaxInstance.disable();

    }, [])
    return (
        <div className="video-section section section-padding-t90-b100" ref={refSectionLearnMore} >
            <div className="container">
                <div className="row">

                    <div className="col-lg-8 m-auto" data-aos="fade-up">
                        <div className="about-content-full text-center mb-lg-10 mb-0">
                            <h2 className="title">A technology agency focused on AI and customer service.</h2>
                            <p>In today&apos;s fast-paced digital world, connecting with your customers at the right time and place is crucial. 
                                That&apos;s where our innovative customer service AI steps in. 
                                Whether your customers are online or on the phone, our AI is designed to meet them wherever they are, ensuring seamless and efficient interactions. 
                                Available 24/7, it consistently delivers accurate information, enhancing customer satisfaction and support.</p>
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="video-popup-area">
                            <div className="skill-video">
                                <img className="image" src={process.env.PUBLIC_URL + "images/video/about-video.jpg"} alt="video popup" />
                                <button className="icon" onClick={()=> setOpen(true)}><i className="fas fa-play"></i></button>
                                <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId="oDusrLBYptU" onClose={() => setOpen(false)}/>
                            </div>

                            <div className="shape shape-1" id="scene" ref={sceneEl}>
                                <span data-depth="1">
                                    <img src={process.env.PUBLIC_URL + "images/shape-animation/video-shape-1.png"} alt="" />
                                </span>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

HomeAboutThree.propTypes = {
    refSectionLearnMore: PropTypes.object,
}

export default HomeAboutThree;
