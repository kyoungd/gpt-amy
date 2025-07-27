import React from 'react';
import PropTypes from "prop-types";
import Typewriter from 'typewriter-effect';
import { Link } from "react-router-dom";

const IntroThree = ({ refSectionLearnMore }) => {
    const scrollToSection = () => {
        if (refSectionLearnMore && refSectionLearnMore.current) {
            refSectionLearnMore.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="intro-section section overlay" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/hero-image/hero-4.jpg)` }}>
            <div className="container">
                <div className="grid grid-cols-1">
                    <div className="self-center">
                        <div className="intro-content-two headline-active text-center mt-xl-8 mt-lg-8 mt-md-8 mt-sm-8 mt-xs-8">
                            <h2 className="title ah-headline">
                                Designing {" "}
                                <Typewriter
                                    options={{
                                        strings: ["awesome", "wonderful", "beautiful"],
                                        autoStart: true,
                                        loop: true,
                                        deleteSpeed: 110
                                    }}
                                />
                                customer service
                            </h2>
                            <div className="desc">
                                <p>Introducing our state-of-the-art AI solution, designed for effortless setup, cost efficiency, and round-the-clock availability. Empower your business and exceed your customers expectations.</p>
                            </div>
                            <Link className="btn btn-outline-white btn-hover-primary" onClick={scrollToSection}>Learn More</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

IntroThree.propTypes = {
    refSectionLearnMore: PropTypes.object
};

export default IntroThree;
