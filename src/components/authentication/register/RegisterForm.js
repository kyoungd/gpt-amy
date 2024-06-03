import React, { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { Stack, TextField, IconButton, InputAdornment, Typography, Container } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { registerUser, useUserDispatch } from '../../UserContext';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const userDispatch = useUserDispatch();

  // Async validation function to check email uniqueness
  const checkEmailUniqueness = async (email) => {
    try {
      const baseUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:1337';
      const response = await axios.post(`${baseUrl}/api/accounts/check-email`, { email });
      console.log('Email check response:', response.data); // Add this line
      return response.data.isUnique;
    } catch (error) {
      console.error('Error checking email uniqueness', error);
      throw new Error('Unable to verify email uniqueness');
    }
  };
    
  // Validation schema
  const RegisterSchema = Yup.object().shape({
    // Other field validations...
    email: Yup.string()
      .email('Email must be a valid email address')
      .required('Email is required')
      .test(
        'email-unique', 
        'Email already in use', 
        // The value is the email entered by the user
        (value) => checkEmailUniqueness(value).then(isUnique => {
          // If the email is unique, the validation passes (true)
          // If the email is not unique, the validation fails (false)
          return isUnique;
        }).catch(() => {
          // Handle the error appropriately; maybe allow the validation to pass and handle it differently
          return true; // Consider how you want to handle server errors
        })
      ),
  });
  
  const formik = useFormik({
    initialValues: {
      userName: '',
      email: '',
      password: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: async (formValues) => {
      registerUser(
        userDispatch,
        navigate,
        formValues.userName,
        formValues.email,
        formValues.password,
        setIsLoading,
        setMessage
      );
    },
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <Container maxWidth="sm">
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="User Name"
              {...getFieldProps('userName')}
              error={Boolean(touched.userName && errors.userName)}
              helperText={touched.userName && errors.userName}
            />
            <TextField
              fullWidth
              type="email"
              label="Email Address"
              {...getFieldProps('email')}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />
            <TextField
              fullWidth
              type={showPassword ? 'text' : 'password'}
              label="Password"
              {...getFieldProps('password')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />
            {isLoading && <Typography sx={{ color: 'text.secondary' }}>Loading...</Typography>}
            {message && <Typography sx={{ color: 'text.secondary' }}>{message}</Typography>}
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isLoading}
            >
              Register
            </LoadingButton>
          </Stack>
        </Form>
      </FormikProvider>
    </Container>
  );
};

export default RegisterForm;
