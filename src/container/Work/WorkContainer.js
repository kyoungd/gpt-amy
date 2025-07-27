import React from 'react';
import SectionTitle from '../../components/SectionTitles/SectionTitle';
import WorkData from '../../data/work/workDetails.json';
import WorkItemTwo from '../../components/Work/WorkItemTwo.jsx';

const WorkContainer = () => {
    return (
        <div className="section section-padding-t90-b100">
            <div className="container">

                <SectionTitle
                    headingOption="title fz-32"
                    title="Crafting effective digital marketing, web development, <br> video content and communication design"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 -mb-6 space-y-6">

                    {WorkData && WorkData.map((single, key) => {
                            return(
                                <div key={key} className="mb-6" data-aos="fade-up" data-aos-delay="300">
                                    <WorkItemTwo classOption="box-border" data={single} key={key} />
                                </div>
                            ); 
                    })}
                    
                </div>

            </div>
        </div>
    )
}

export default WorkContainer;
