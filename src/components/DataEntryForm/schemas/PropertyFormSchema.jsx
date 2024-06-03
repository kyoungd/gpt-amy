import * as yup from "yup";

export const propertyFormSchema = yup.object().shape({
  phone_number: yup.string().matches(
    /^1-?\d{3}-?\d{3}-?\d{4}$/,
    'Phone number is not valid. Format should be 1XXXXXXXXXX or 1-XXX-XXX-XXXX, e.g., 15551234567 or 1-555-123-4567'
  ),  
  address: yup.string()
    .required('Address is required')
    .matches(
      /.*,\s*([A-Z]{2})\s(\d{5}(-\d{4})?)$/,
      'Address must be in the format: "123 Main Street, City, ST 12345"'
    ),  
  description: yup.string(),
  passcode: yup.string().matches(/^\d{4}$/, 'Passcode must be 4 digits'),
});

// const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// // min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

// export const advancedSchema = yup.object().shape({
//   username: yup
//     .string()
//     .min(3, "Username must be at least 3 characters long")
//     .required("Required"),
//   jobType: yup
//     .string()
//     .oneOf(["designer", "developer", "manager", "other"], "Invalid Job Type")
//     .required("Required"),
//   acceptedTos: yup
//     .boolean()
//     .oneOf([true], "Please accept the terms of service"),
// });