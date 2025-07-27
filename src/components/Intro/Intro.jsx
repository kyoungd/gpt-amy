import React from 'react'
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

const Intro =  ({data, refSectionLearnMore}) => {
    const scrollToSection = () => {
        if (refSectionLearnMore && refSectionLearnMore.current) {
            refSectionLearnMore.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        
        <div className="intro-section overlay section" style={{backgroundImage: `url(${process.env.PUBLIC_URL + data.backgroundImage})`}}>

            <div className="container">
                <div className="grid grid-cols-1">

                    <div className="self-center">
                        <div className="intro-content xl:mt-8 lg:mt-8 md:mt-8 sm:mt-8 mt-8">
                            <h2 className="title">{data.title}</h2>
                            <div className="desc">
                                <p>{data.desc}</p>
                            </div>
                            {/* <Link to={process.env.PUBLIC_URL + `/get-started/1`} className="btn btn-primary btn-hover-secondary">Get Started</Link> */}
                            <Link className="btn btn-outline-white btn-hover-primary" onClick={scrollToSection}> Learn More </Link>
                        </div>
                    </div>

                </div>
            </div>

        </div>
        
    )
}

Intro.propTypes = {
    refSectionLearnMore: PropTypes.object,
    data: PropTypes.object
};
  

export default Intro
