import React from 'react';
import PropTypes from 'prop-types';
import ShowCards from './showCards';

function SettingsForm ({ jwt }) {
    return (
        <div className="contact-form" data-aos="fade-up" data-aos-delay="300">
            <div className="row mb-n6">
                <ShowCards token={jwt} />
            </div>
        </div>
    )
}

SettingsForm.propTypes = {
    jwt: PropTypes.string.isRequired,
};

export default SettingsForm;
