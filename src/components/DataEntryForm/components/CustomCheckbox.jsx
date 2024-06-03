import PropTypes from 'prop-types';
import { useField } from "formik";

const CustomCheckbox = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <div className="checkbox">
        <input
          {...field}
          {...props}
          className={meta.touched && meta.error ? "input-error" : ""}
        />
        <span> {label}</span>
      </div>

      {meta.touched && meta.error && <div className="error">{meta.error}</div>}
    </>
  );
};

CustomCheckbox.propTypes = {
  label: PropTypes.string.isRequired,
  // Add validation for other props as needed
};

export default CustomCheckbox;