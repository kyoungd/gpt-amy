import React from 'react';
import PropTypes from 'prop-types';
import ReportRoot from '../../pages/ReportRoot';
import NoEditForm from '../../components/DataEntryForm/NoEditForm';
import * as Sentry from "@sentry/react";

const GetStartedQuestionsAnswers = ({jwt}) => {

    const baseApiPath = 'customer-answers/unanswered-questions';

    const filterFunc = (rows, columns) => {
        try {
            const filtered_columns = columns.filter(col => !['is_answered', 'is_answer_approved'].includes(col.key));
            filtered_columns.push({key: 'status', name: 'status'});
            const filtered_rows = rows.map(row => {
                let status_value = 'waiting...';
                if (row.is_answered && !row.is_answer_approved)
                    status_value = 'waiting for AI...'
                if (!row.is_answered && !row.is_answer_approved)
                    status_value = 'waiting for Answer...'
                return ({ ...row, status: status_value });
            });
            return { filteredRows: filtered_rows, filteredColumns: filtered_columns };
        }
        catch (error) {
            Sentry.captureException(error);
            console.log(error);
            return { rows, columns };
        }
    }

    return (
        <>
            <ReportRoot
                jwt={jwt}
                title=""
                apipath={baseApiPath}
                EditComponent={NoEditForm}
                FilterDataFunc={filterFunc}
                classOption="section section-padding-bottom"
                allowAction={["list"]}
            /> 
        </>
    );
}

GetStartedQuestionsAnswers.propTypes = {
    jwt : PropTypes.string.isRequired
};
  
export default GetStartedQuestionsAnswers;
