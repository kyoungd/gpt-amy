import React from 'react';
import PropTypes from "prop-types";
import BlogClassicData from '../../data/blog/BlogClassic.json';
import BlogItem from '../../components/Blog/BlogItem';
import SectionTitle from '../../components/SectionTitles/SectionTitle';

const HomeBlog =({ SectionBgColor }) => {
    return (
        <div className={`section section-padding-t90-b100 ${SectionBgColor}`}>
            <div className="container">
                <SectionTitle
                    title="Sample AI Receptionist"
                    subTitle="You can interact with our AI receptionist to schedule a callback appointment."
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 -mb-6 space-y-6">
                        {BlogClassicData && BlogClassicData.slice(0, 3).map((single, key) => {
                            return(
                                <div key={key} className="mb-6" data-aos="fade-up">
                                    <BlogItem data={single} key={key} />
                                </div>
                            ); 
                        })}
                </div>
            </div>
        </div>
    )
}
HomeBlog.propTypes = {
    SectionBgColor: PropTypes.string
};
HomeBlog.defaultProps = {
    SectionBgColor: "section section-padding-t90-b100"
};

export default HomeBlog
