import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import PropTypes from 'prop-types';

const ContactForm = ({ jwt }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    mode: "onBlur",
  });
  // State for managing success and error messages
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const url = `${process.env.REACT_APP_BACKEND_URL}/api/customer-requests`;
      const values = { 'data': data };
      let headers = {};
      if (jwt)
        headers['Authorization'] = `Bearer ${jwt}`;
      headers['Content-Type'] = 'application/json';
      const response = await axios.post(url, values, headers);
      console.log(response.data);
      // Check if the response status code is 200
      if (response.status === 200) {
        alert('Your request has been submitted successfully.');
        setIsError(false);
        reset(); // Reset form fields after successful submission
      } else {
        // Handle any other response status code as an error
        setFeedbackMessage('An unexpected error occurred. Please try again.');
        setIsError(true);
      }
    } catch (error) {
      console.error('Error updating data:', error);
      // Set error message from error object, if available
      setFeedbackMessage(error.response?.data?.message || 'An error occurred while submitting your request.');
      setIsError(true);
    }
  };

  const phoneRegex = /^(\+\d{1,2}\s?)?1?-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

  return (
    <div className="contact-form" data-aos="fade-up" data-aos-delay="300">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row mb-n6">
          <div className="col-md-6 col-12 mb-6">
            <input
              type="text"
              placeholder="Your Name *"
              name="contact_name"
              {...register("contact_name", {
                required: "Name is required",
              })}
            />
            {errors?.contact_name && <p>{errors.contact_name?.message}</p>}
          </div>
          <div className="col-md-6 col-12 mb-6">
            <input
              type="email"
              placeholder="Email *"
              name="contact_email"
              {...register("contact_email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors?.contact_email && <p>{errors.contact_email?.message}</p>}
          </div>
          <div className="col-md-12 col-12 mb-6">
            <input
              type="text"
              placeholder="Phone *"
              name="contact_phone"
              {...register("contact_phone", {
                required: "Phone is required",
                pattern: {
                  value: phoneRegex,
                  message: "Invalid phone number",
                },
              })}
            />
            {errors?.contact_phone && <p>{errors.contact_phone?.message}</p>}
          </div>
          <div className="col-12 mb-6">
            <textarea
              placeholder="Description *"
              name="contact_description"
              {...register("contact_description", {
                required: "Description is required",
              })}
              rows="4"
            ></textarea>
            {errors?.contact_description && <p>{errors.contact_description?.message}</p>}
          </div>
          {/* Feedback message display */}
          {feedbackMessage && (
            <div className={`col-12 ${isError ? 'text-danger' : 'text-success'}`}>
              {feedbackMessage}
            </div>
          )}
          <div className="col-12 mb-6">
            <button type="submit" className="btn btn-primary btn-hover-secondary">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );                
};

ContactForm.propTypes = {
  jwt: PropTypes.string
};

ContactForm.defaultProps = {
  jwt: null
};

export default ContactForm;
