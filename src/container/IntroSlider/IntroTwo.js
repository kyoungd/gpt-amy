import React from 'react';
import PropTypes from "prop-types";
import YoutubeBackground from 'react-youtube-background'
import {Link} from "react-router-dom";

const IntroTwo = ({ refSectionLearnMore }) => {
    const scrollToSection = () => {
        if (refSectionLearnMore && refSectionLearnMore.current) {
            refSectionLearnMore.current.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return (
        <YoutubeBackground
            videoId="oDusrLBYptU"
            overlay="rgba(0,0,0,.4)"
            className="intro-section section bg-video"
        >
            <div className="container">
                <div className="row row-cols-lg-1 row-cols-1">

                    <div className="col align-self-center">
                        <div className="intro-content-two text-center mt-xl-8 mt-lg-8 mt-md-8 mt-sm-8 mt-xs-8">
                            <h2 className="title">Designing awesome customer service </h2>
                            <div className="desc">
                                <p>Introducing our state-of-the-art AI solution, designed for effortless setup, cost efficiency, 
                                    and round-the-clock availability. Empower your business and exceed your customers expectations.</p>
                            </div>
                            <Link className="btn btn-outline-white btn-hover-primary" onClick={scrollToSection}>Learn More</Link>
                        </div>
                    </div>

                </div>
            </div>
        </YoutubeBackground>
    )
}

IntroTwo.propTypes = {
    refSectionLearnMore: PropTypes.object
};

export default IntroTwo;
