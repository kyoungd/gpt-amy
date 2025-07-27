import React from 'react';
import SectionTitleTwo from '../../components/SectionTitles/SectionTitleTwo';
import useMasonry from "../../hooks/use-masonry";
import WorkFilter from "../../components/Work/WorkFilter";
import WorkItem from "../../components/Work/WorkItem";
import workData from '../../data/work/workDetails.json';
import {slugify} from "../../utils";


const Portfolio = () => {

    // Isotope Categories list JS

    const {categories} =  useMasonry(workData, ".mesonry-list", ".masonry-grid", ".messonry-button", ".messonry-button button")


    return (
        <div className="section section-padding ag-masonary-wrapper">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-5">
                            <SectionTitleTwo 
                                subTitle="Portfolios"
                                title="2Huamn Advantage"
                            />
                    </div>
                    <div className="col-lg-7" data-aos="fade-up" data-aos-delay="300">
                        <WorkFilter categories={categories}/>
                    </div>
                </div>

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

export default Portfolio
