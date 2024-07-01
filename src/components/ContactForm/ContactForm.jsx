import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from 'emailjs-com';

const ContactForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    mode: "onBlur",
  });
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const onSubmit = async (data) => {
    try {
      console.log(data);
      data['contact_source'] = "oyate.ai";
      const result = await emailjs.send(
        process.env.REACT_APP_EMAIL_SERVICE_ID,
        process.env.REACT_APP_EMAIL_TEMPLATE_ID,
        data,
        process.env.REACT_APP_EMAIL_USER_ID
      );
      console.log(result.text);
      if (result.status === 200) {
        alert('Your request has been submitted successfully.');
        setFeedbackMessage('Your request has been submitted successfully.');
        setIsError(false);
        reset(); // Reset form fields after successful submission
      } else {
        alert('An unexpected error occurred. Please try again.');
        setFeedbackMessage('An unexpected error occurred. Please try again.');
        setIsError(true);
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert(error.text || 'An error occurred while submitting your request.');
      setFeedbackMessage(error.text || 'An error occurred while submitting your request.');
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

export default ContactForm;
