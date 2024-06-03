import PropTypes from "prop-types";
import React from 'react';
import IconBoxData from '../../data/iconBox/icon-box.json';
import IconBox from '../../components/IconBox/IconBox.jsx';
import SectionTitle from '../../components/SectionTitles/SectionTitle';
import { useUserState } from '../../components/UserContext';

const ServiceIconBox = ({ classOption }) => {
    const { isAuthenticated, jwt } = useUserState();
    return (
        <div className={`section section-padding-t90-b100 ${classOption}`}>
            <div className="container">

                <SectionTitle
                    title="Our Services"
                    subTitle="Our AI powered platform helps you to find the best outcome for your business"
                />

                <div className="row row-cols-lg-3 row-cols-md-2 row-cols-sm-2 row-cols-1 mb-n6">

                    {IconBoxData && IconBoxData.slice(0, 3).map((single, key) => {
                        return(
                            <div key={key} className="col mb-6" data-aos="fade-up">
                                <IconBox classOption="box-border" data={single} token={jwt} key={key} isAuth={isAuthenticated} />
                            </div>
                        ); 
                    })}
                </div>

            </div>
        </div>
    )
}

ServiceIconBox.propTypes = {
    classOption: PropTypes.string
  };
  ServiceIconBox.defaultProps = {
    classOption: "section section-padding-t90-b100"
};

export default ServiceIconBox;
