import React from "react";
import PropTypes from 'prop-types';

const GetStartedBlock = ({jwt, name, Service, description, classOption}) => {
    return (
        <div className={`${classOption}`}>
            <div className="about-funfact service-panel">
                <h6 className="text">{name}</h6>
                <Service jwt={jwt} />
                { description.length > 0 && <>
                    <hr className="line" />
                    <br />
                    <p className="desc">{description}</p>                 
                </> }
            </div>
        </div>
    );
            
}

GetStartedBlock.propTypes = {
  jwt: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  Service : PropTypes.func.isRequired,
  description: PropTypes.string,
  classOption: PropTypes.string
};
  
GetStartedBlock.defaultProps = {
    classOption: "section section-padding-t90 section-padding-bottom",
    description: ""
};

export default GetStartedBlock;
