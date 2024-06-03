import PropTypes from "prop-types";
import React from 'react';
import ReactVivus from 'react-vivus';
import PaymentPopup from "../Techniques/PaymentPopup";
import {Link} from "react-router-dom";

const IconBox = ({ data, isAuth, classOption }) => {
    const renderDescription = () => {
        if (Array.isArray(data.desc)) {
            return (
                <ul style={{ textAlign: 'left' }}>
                    {data.desc.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            );
        } else {
            return <p>{data.desc}</p>;
        }
    };

    return (
        <div className={`icon-box text-center ${classOption}`}>
            <div className="icon">
                <ReactVivus
                    id={`servicesvg-${data.id}`}
                    option={{
                        file: data.icon,
                        animTimingFunction: 'EASE',
                        type: 'oneByOne',
                        delay: 80
                    }}
                />
            </div>
            <div className="content">
                <h3 className="title">{data.title}</h3>
                <div className="desc">
                    {renderDescription()}
                </div>
                <div className="desc">
                    <h5 className="title">{data.price}</h5>
                </div>
                {isAuth && 
                    <div className="desc">
                        <PaymentPopup id={data.id} />
                    </div>
                }
                {!isAuth && 
                    <div className="desc">
                        <Link to={process.env.PUBLIC_URL + '/login'} className="btn btn-light btn-hover-primary">Login and Subscribe</Link>
                    </div>
                }
            </div>
        </div>
    );
}

IconBox.propTypes = {
    data: PropTypes.object,
    classOption: PropTypes.string,
    isAuth: PropTypes.bool,
};

IconBox.defaultProps = {
    classOption: "icon-box text-center",
};

export default IconBox;
