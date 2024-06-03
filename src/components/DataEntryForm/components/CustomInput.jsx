import React from 'react';
import { useField } from 'formik';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import PropTypes from 'prop-types';

const CustomInput = ({ label, tooltipText, ...props }) => {
  const [field, meta, helpers] = useField(props);

  // Ensure field.value is never undefined to avoid the input becoming uncontrolled
  // Instead of modifying field.value directly, use Formik's setFieldValue on component mount to ensure consistency.
  React.useEffect(() => {
    if (field.value === undefined) {
      helpers.setValue('');
    }
  }, [field.value, helpers]);

  // Define the tooltip
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {tooltipText}
    </Tooltip>
  );

  return (
    <>
      <OverlayTrigger placement="top" overlay={renderTooltip}>
        <label>{label}</label>
      </OverlayTrigger>
      <input
        {...field}
        {...props}
        className={meta.touched && meta.error ? "input-error" : ""}
      />
      {meta.touched && meta.error && <div className="error">{meta.error}</div>}
    </>
  );
};

CustomInput.propTypes = {
  label: PropTypes.string.isRequired,
  tooltipText: PropTypes.string,
};

export default CustomInput;
