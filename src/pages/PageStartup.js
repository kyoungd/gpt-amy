import React from 'react';
import PropTypes from 'prop-types';
import StartupForm from '../components/DataEntryForm/StartupForm';
import StartupRoot from './StartupRoot';

PageStartup.propTypes = {
    jwt: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    apipath: PropTypes.string.isRequired,
    pageTypes: PropTypes.arrayOf(PropTypes.string.isRequired),
    classOption: PropTypes.string
};

PageStartup.defaultProps = {

}

function PageStartup ({jwt, title, subtitle, pageTypes, apipath, classOption}) {
    return (
        <React.Fragment>
            <StartupRoot
                jwt={jwt}
                title={title}
                subtitle={subtitle}
                apipath={apipath}
                pageTypes={pageTypes}
                classOption={classOption}
                EditComponent={StartupForm}
            />
        </React.Fragment>
    )
}

export default PageStartup;
