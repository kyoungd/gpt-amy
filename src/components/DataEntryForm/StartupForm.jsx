import React, { useEffect } from "react";
import { Form, Formik } from "formik";
import CustomCheckbox from "./components/CustomCheckbox";
import CustomInput from "./components/CustomInput";
import PropTypes from 'prop-types';
import StartupCustomizedForm from "./StartupCustomizedForm";


const question_fieldname = (field_name) => field_name + '_q';
const answer_fieldname = (field_name) => field_name + '_a';

const formContent = (formikProps, formData, formPageTypes, formAsyncDebounceSaveUpdate, formAsyncSaveUpdate) => {
  const { setFieldValue, values } = formikProps;

  console.log('formContent - values');
  console.log(JSON.stringify(values, null, 4));

  const field_default = (elem) => {
    const field_name = answer_fieldname(elem.field_name);
    return (
      <CustomInput
        label={elem.field_label}
        tooltipText={elem.field_tooltip}
        name={field_name}
        type="text"
        placeholder={elem.field_placeholder}
        value={values[field_name]}
        onChange={async (e) => {
          const newValue = e.target.value;
          setFieldValue(field_name, newValue);
          await formAsyncDebounceSaveUpdate(elem.id, '', newValue, elem.type);
        }}
      />
    );
  };

  // Filter and sort the fields based on the formPageTypes and field_label
  const sortedFormData = formData
    .filter(obj => formPageTypes.includes(obj.type))
    .sort((a, b) => a.field_label.localeCompare(b.field_label)); // Sorting by field_label

  return sortedFormData.map(elem => {
    if (elem.field_type === "checkbox") {
      return (
        <div key={elem.id} className="startup-form-element">
          <CustomCheckbox
            label={elem.field_label}
            name={elem.field_name}
            checked={values[elem.field_name]}
            onChange={(e) => {
              setFieldValue(elem.field_name, e.target.checked);
            }}
          />
        </div>
      );
    } else {
      return (
        <div key={elem.id} className="startup-form-element">
          { !formPageTypes.includes('customized') && field_default(elem) }
          { formPageTypes.includes('customized') && 
            <StartupCustomizedForm 
              elem={elem}
              values={values} 
              setFieldValue={setFieldValue}
              asyncDebounceSaveUpdate={formAsyncDebounceSaveUpdate}
              asyncSaveUpdate={formAsyncSaveUpdate}
            /> }
        </div>
      );
    }
  });
};

const StartupForm = ({ data, pageTypes, asyncDebounceSaveUpdate, asyncSaveUpdate }) => {

  if (!data || (Array.isArray(data) && data.length <= 0)) {
    return <React.Fragment />;
  }

  // Transform data into Formik initialValues format
  const initialValues = data.reduce((acc, curr) => {
    acc[question_fieldname(curr.field_name)] = curr.question;
    acc[answer_fieldname(curr.field_name)] = curr.answer ?? '';
    return acc;
  }, {});

  console.log('StartupForm - initialValues ', pageTypes.join(','));
  console.log(JSON.stringify(initialValues, null, 4));

  return (
    <Formik 
      enableReinitialize
      key={pageTypes.join('')}
      initialValues={{...initialValues}}
      >
      {(formikProps) => (
        <Form>
          {formContent(formikProps, data, pageTypes, asyncDebounceSaveUpdate, asyncSaveUpdate)}
        </Form>
      )}
    </Formik>
  );
  
};

StartupForm.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    field_label: PropTypes.string.isRequired,
    field_name: PropTypes.string.isRequired,
    field_type: PropTypes.string.isRequired,
    field_placeholder: PropTypes.string,
    field_tooltip: PropTypes.string,
    answer: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]).isRequired,
  })).isRequired,
  pageTypes: PropTypes.arrayOf(PropTypes.string.isRequired),
  asyncDebounceSaveUpdate: PropTypes.func.isRequired,
  asyncSaveUpdate: PropTypes.func.isRequired,
};

export default StartupForm;
