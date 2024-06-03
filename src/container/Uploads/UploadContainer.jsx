import React from 'react';
import PropTypes from 'prop-types';
import UploadList from '../../components/Uploads/UploadList';
import SectionTitle from '../../components/SectionTitles/SectionTitle';

const UploadContainer = ({ token }) => {
    return (
        <div className="section section-padding-t90-b100">
            <div className="container">

                <SectionTitle
                    headingOption="title fz-32"
                    title="AI Knowledge Base Content Upload"
                />

                <div className="row row-cols-lg-3 row-cols-md-2 row-cols-1 mb-n6">
                    <UploadList token={token} />
                </div>

            </div>
        </div>
    )
}

UploadContainer.propTypes = {
    token: PropTypes.string.isRequired,
};
  
export default UploadContainer;
