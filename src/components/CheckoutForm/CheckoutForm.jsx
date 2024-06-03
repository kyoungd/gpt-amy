import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API_KEY);
const paymentUrl = `${process.env.REACT_APP_BACKEND_URL}/api/subscriptions/payments`;

// Custom styling for Stripe Elements
const ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#9e2146',
    },
  },
};

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setPaymentProcessing(true);
    setError(null); // Reset error state

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      setPaymentProcessing(false);
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardNumberElement,
    });

    if (error) {
      setError(error.message);
      setPaymentProcessing(false);
    } else {
      processPayment(paymentMethod.id);
    }
  };

  const processPayment = async (paymentMethodId) => {
    try {
      const response = await axios.post(paymentUrl, {
        paymentMethodId,
        amount: 1000, // Example amount in cents
        currency: 'usd',
      });

      if (response.data.success) {
        alert('Payment Successful!');
      } else {
        setError('Payment failed: ' + response.data.message);
      }
    } catch (error) {
      setError('Payment processing error. Please try again.');
    } finally {
      setPaymentProcessing(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Card Number</Form.Label>
        <CardNumberElement options={ELEMENT_OPTIONS} className="form-control" />
      </Form.Group>
      <Form.Group>
        <Form.Label>Expiration Date</Form.Label>
        <CardExpiryElement options={ELEMENT_OPTIONS} className="form-control" />
      </Form.Group>
      <Form.Group>
        <Form.Label>CVC</Form.Label>
        <CardCvcElement options={ELEMENT_OPTIONS} className="form-control" />
      </Form.Group>
      {error && <Alert variant="danger">{error}</Alert>}
      <Button type="submit" disabled={!stripe || paymentProcessing}>
        {paymentProcessing ? 'Processing...' : 'Pay'}
      </Button>
    </Form>
  );
};

const StripePaymentForm = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default StripePaymentForm;
