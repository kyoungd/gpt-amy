import { Form, Formik } from "formik";
import { propertyFormSchema } from "./schemas/PropertyFormSchema";
import CustomCheckbox from "./components/CustomCheckbox";
import CustomInput from "./components/CustomInput";
import CustomTextbox from "./components/CustomTextbox";
import PropTypes from 'prop-types';

const PropertyForm = ({data, toggleToViewModeFunc, asyncSaveChangeFunc }) => {

  const onSubmit = async (values, actions) => {
    try {
      const response = await asyncSaveChangeFunc(values);
      actions.resetForm();
      // Optionally, do something with the response, like showing a success message
    } catch (error) {
      console.error('Error saving changes:', error);
      // Handle the error, e.g., show an error message to the user
      // You can use actions.setSubmitting(false) to stop the form from being in the submitting state
      actions.setSubmitting(false);
  
      // If the error object contains any form-specific error messages, you can set them using actions.setErrors
      // For example:
      // if (error.response && error.response.data) {
      //   actions.setErrors(error.response.data);
      // }
    }
  };
  
  return (
    <Formik
      initialValues={{...data}}
      validationSchema={propertyFormSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <CustomInput
            label="Phone Number"
            name="phone_number"
            type="text"
            placeholder="Enter your phone number"
          />
          <CustomInput
            label="Address"
            name="address"
            type="text"
            placeholder="Enter your address"
          />
          <CustomTextbox
            label="Description"
            name="description"
            type="text"
            placeholder="Enter property description"
          />
          <CustomCheckbox
            type="checkbox"
            name="is_active"
            label=" Is Active"
          />
          <CustomInput
            label="Passcode"
            name="passcode"
            type="password"
            placeholder="Enter your 4 digit passcode"
          />
          <div style={{ marginTop: '20px' }}>
            <button 
              type="submit" 
              className="btn btn-primary btn-hover-secondary"
              disabled={isSubmitting} >
              Submit
            </button>
            <button  
              className="btn btn-secondary btn-hover-secondary"
              onClick={toggleToViewModeFunc} 
              style={{ marginLeft: '10px' }} >
              Cancel
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

PropertyForm.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.null
    ]),
    phone_number: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    is_active: PropTypes.bool.isRequired,
    passcode: PropTypes.string.isRequired,
  }).isRequired,
  toggleToViewModeFunc: PropTypes.func.isRequired,
  asyncSaveChangeFunc: PropTypes.func.isRequired,
};

export default PropertyForm;