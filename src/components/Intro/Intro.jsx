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
                <div className="row row-cols-lg-1 row-cols-1">

                    <div className="col align-self-center">
                        <div className="intro-content mt-xl-8 mt-lg-8 mt-md-8 mt-sm-8 mt-xs-8">
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
