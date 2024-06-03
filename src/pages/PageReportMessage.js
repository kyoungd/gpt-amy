import React from 'react';
import PropTypes from 'prop-types';
import ConversationForm from '../components/DataEntryForm/ConversationForm';
import PageReportRoot from './PageReportRoot';
import * as Sentry from "@sentry/react";

PageReportMessage.propTypes = {
    jwt: PropTypes.string.isRequired,
    classOption: PropTypes.string
};

function PageReportMessage ({jwt, classOption}) {
    const title = "CONVERSATIONS";
    const subtitle = "Conversation history between your AI and customers"
    const apipath = "messages/reports";

    const filterFunc = (rows, columns) => {
        try {
            return { filteredRows: rows, filteredColumns: columns };
        }
        catch (error) {
            Sentry.captureException(error);
            console.log(error);
            return { rows, columns };
        }
    }

    return (
        <React.Fragment>
            <PageReportRoot
                jwt={jwt}
                title={title}
                subtitle={subtitle}
                apipath={apipath}
                classOption={classOption}
                EditComponent={ConversationForm}
                FilterDataFunc={filterFunc}
            />
        </React.Fragment>
    )
}

export default PageReportMessage;
