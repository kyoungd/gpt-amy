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

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 -mb-6 space-y-6">

                    {IconBoxData && IconBoxData.slice(0, 3).map((single, key) => {
                        return(
                            <div key={key} className="mb-6" data-aos="fade-up">
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
