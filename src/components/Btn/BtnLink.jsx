import React from 'react';
import PropTypes from "prop-types"
import {Link} from "react-router-dom";


const BtnLink = (props) => {
    return (
        <React.Fragment>
            <Link to={process.env.PUBLIC_URL + props.urlpath} className="btn btn-light btn-hover-primary">{props.name}</Link>
        </React.Fragment>
    )
}

BtnLink.propTypes = {
    name: PropTypes.string,
    urlpath: PropTypes.string
}

export default BtnLink
