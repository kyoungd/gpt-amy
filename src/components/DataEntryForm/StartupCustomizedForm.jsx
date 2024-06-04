import React, { useState } from "react";
import { Button } from 'react-bootstrap';
import CustomInput from "./components/CustomInput";
import PropTypes from 'prop-types';

const StartupCustomizedForm = ({ elem, values, setFieldValue, asyncDebounceSaveUpdate, asyncSaveUpdate }) => {
    const [showQuestion, setShowQuestion] = useState(false);
    const question_fieldname = (field_name) => field_name + '_q';
    const answer_fieldname = (field_name) => field_name + '_a';
    const CUSTOM_LABEL_LENGTH = 70;
    const pageType = 'customized';

    // Inline style for the circular button
    const circularButtonStyle = {
        borderRadius: '50%', // Makes the button circular
        display: 'inline-flex', // Keeps the button content centered
        justifyContent: 'center', // Center content horizontally
        alignItems: 'center', // Center content vertically
        padding: '0.5em', // Adjust padding as needed, ensures circular shape
        fontSize: '1em', // Adjust font size as needed
        lineHeight: 1, // Ensures the height is close to the width, making it more circular
        width: 'auto', // Lets the button size adjust based on content and padding
        height: 'auto', // Lets the button size adjust based on content and padding
        margin: '0.5em 0 0 0.5em' // Adjust margin as needed
    };

    const field_customized_question = (elem) => {
        const lightenedCircularButtonStyle = {
            ...circularButtonStyle, // Spread existing styles
            opacity: 0.7, // Slightly transparent to appear lighter
        };
        try {
            const label = values[answer_fieldname(elem.field_name)];
            const field_label = label.length > CUSTOM_LABEL_LENGTH ? label.substring(0, CUSTOM_LABEL_LENGTH) + '...' : label;
            const field_name = question_fieldname(elem.field_name);
            return (
                <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}> {/* Ensure the container fills its parent */}
                    <div style={{ flexGrow: 1 }}> {/* This div will grow to use available space */}
                        <CustomInput
                            label={field_label}
                            tooltipText={elem.field_tooltip}
                            name={field_name}
                            type="text"
                            placeholder={elem.field_placeholder}
                            value={values[field_name]}
                            onChange={async (e) => {
                                const newValue = e.target.value;
                                setFieldValue(field_name, newValue);
                                await asyncDebounceSaveUpdate(elem.id, newValue, '', pageType);
                            }}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}> {/* Aligns Button to the bottom */}
                        <Button
                            style={lightenedCircularButtonStyle}
                            variant="secondary"
                            onClick={() => setShowQuestion(false)}
                            title="Edit Question"
                            aria-label="click here to edit question.  Normally, you can only edit the answer.">
                            ↔
                        </Button>
                        <Button
                            style={circularButtonStyle}
                            variant="secondary"
                            onClick={() => {
                                const isConfirmed = window.confirm("Are you sure you want to delete this question?");
                                if (isConfirmed) {
                                    asyncSaveUpdate(elem.id, '', '', pageType, true, true);
                                }
                            }}
                            title="Delete Question"
                            aria-label="click here to delete question.">
                            X 
                        </Button>
                    </div>
                </div>
            );
        }
        catch (error) {
            return <React.Fragment />;
        }
    }

    const field_customized_answers = (elem) => {
        try {
            const label = values[question_fieldname(elem.field_name)]
            const field_label = label.length > CUSTOM_LABEL_LENGTH ? label.substring(0, CUSTOM_LABEL_LENGTH) + '...' : label;
            const field_name = answer_fieldname(elem.field_name);
            return (
                <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}> {/* Ensure the container fills its parent */}
                    <div style={{ flexGrow: 1 }}> {/* This div will grow to use available space */}
                        <CustomInput
                            label={field_label}
                            tooltipText={elem.field_tooltip}
                            name={field_name}
                            type="text"
                            placeholder={elem.field_placeholder}
                            value={values[field_name]}
                            onChange={async (e) => {
                                const newValue = e.target.value;
                                setFieldValue(field_name, newValue);
                                await asyncDebounceSaveUpdate(elem.id, '', newValue, pageType);
                            }}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}> {/* Aligns Button to the bottom */}
                        <Button
                            style={circularButtonStyle}
                            variant="secondary"
                            onClick={() => setShowQuestion(true)}
                            title="Edit Question"
                            aria-label="click here to edit answer.  Return to normal edit mode where you can edit the answer.">
                            ↔
                        </Button>
                        <Button
                            style={circularButtonStyle}
                            variant="secondary"
                            onClick={() => {
                                const isConfirmed = window.confirm("Are you sure you want to delete this question?");
                                if (isConfirmed) {
                                    asyncSaveUpdate(elem.id, '', '', pageType, true, true);
                                }
                            }}
                            title="Delete Question"
                            aria-label="click here to edit question.">
                            X 
                        </Button>
                    </div>
                </div>
            );
        }
        catch (error) {
            return <React.Fragment />;
        }
    }

    return (
        <React.Fragment>
            {showQuestion && field_customized_question(elem)}
            {!showQuestion && field_customized_answers(elem)}
        </React.Fragment>
    );

}

StartupCustomizedForm.propTypes = {
    elem: PropTypes.object.isRequired,
    values: PropTypes.object.isRequired,
    setFieldValue: PropTypes.func.isRequired,
    asyncSaveUpdate: PropTypes.func.isRequired,
    asyncDebounceSaveUpdate: PropTypes.func.isRequired,
};

export default StartupCustomizedForm;
