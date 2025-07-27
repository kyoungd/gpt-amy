import React from 'react';
import SectionTitle from '../../components/SectionTitles/SectionTitle';
import useMasonry from "../../hooks/use-masonry";
import WorkFilter from "../../components/Work/WorkFilter";
import WorkItem from "../../components/Work/WorkItem";
import workData from '../../data/work/workDetails.json';
import {slugify} from "../../utils";

const PortfolioTwo = () => {
    // Isotope Categories list JS

    const {categories} =  useMasonry(workData, ".mesonry-list", ".masonry-grid", ".messonry-button", ".messonry-button button")

    return (
        <div className="section section-padding-t90 ag-masonary-wrapper" data-bg-color="#f8faff">
            <div className="container-fluid px-0">
                <SectionTitle
                    title="Great even greater creative works"
                    subTitle="Get your company heading in the right direction with our digital
                    marketing strategist"
                />

                <WorkFilter classOption="messonry-button text-center mb-lg-13 mb-md-13 mb-6" categories={categories} data-aos="fade-up"/>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-0 mesonry-list">
                    <div className="resizer"></div>
                    {workData && workData.map(portfolio => (
                        <div key={portfolio.id} className={`masonry-grid ${portfolio.categories.map(cat => slugify(cat)).join(" ")}`}>
                            <WorkItem portfolio={portfolio}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PortfolioTwo;
