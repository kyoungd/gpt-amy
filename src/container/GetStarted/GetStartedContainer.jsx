import React from 'react';
import PropTypes from "prop-types";
import SectionTitle from '../../components/SectionTitles/SectionTitle.jsx';
import WorkItemTwo from '../../components/Work/WorkItemTwo.jsx';
import GetStarted1 from '../../data/getstarted/getStarted1.json';
import GetStarted2 from '../../data/getstarted/getStarted2.json';
import GetStarted3 from '../../data/getstarted/getStarted3.json';

const WorkData = (id) => {
    if (id === 1) {
        return GetStarted1;
    } else if (id === 2) {
        return GetStarted2;
    } else if (id === 3) {
        return GetStarted3;
    }
    return null;
}

const GetStartedContainer = ({id}) => {
    return (
        <div className="section section-padding-t90-b100">
            <div className="container">

                <SectionTitle
                    headingOption="title fz-32"
                    title="Crafting effective digital marketing, web development, <br> video content and communication design"
                />

                <div className="row row-cols-lg-3 row-cols-md-2 row-cols-1 mb-n6">

                    {WorkData(id) && WorkData(id).map((single, key) => {
                        return(
                            <div key={key} className="col mb-6" data-aos="fade-up" data-aos-delay="300">
                                <WorkItemTwo classOption="box-border" data={single} key={key} />
                            </div>
                        ); 
                    })}
                    
                </div>

            </div>
        </div>
    )
}

WorkItemTwo.propTypes = {
    id: PropTypes.number.isrequired,
};

export default GetStartedContainer;
