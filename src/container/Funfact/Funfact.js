import PropTypes from "prop-types";
import React from 'react';
import CounterUpData from '../../data/counter/counterText.json';
import CounterUpItem from '../../components/CounterUp/CounterUpItem.jsx';


const Funfact = ({classOption}) => {
    return (
        <div className={`section section-padding-bottom ${classOption}`}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 mx-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 -mb-6 space-y-6">

                        {CounterUpData && CounterUpData.map((single, key) => {
                            return(
                                <div key={key} className="mb-6" data-aos="fade-up">
                                    <CounterUpItem data={single} key={key} />
                                </div>
                            ); 
                        })}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

Funfact.propTypes = {
    classOption: PropTypes.string
  };
  Funfact.defaultProps = {
    classOption: "section section-padding-bottom"
};

export default Funfact
