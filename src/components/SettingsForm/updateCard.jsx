import React, { useEffect, useState } from 'react';
import {
  CardElement,
  useStripe,
  useElements,
  PaymentRequestButtonElement,
} from '@stripe/react-stripe-js';
import { Button, Alert, Form, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import PropTypes from 'prop-types';
import { getSetupIntent } from '../../utils/stripe-subscriptions';

const UpdateCard = ({ jwt }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [paymentRequest, setPaymentRequest] = useState(null);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState('');
  
  useEffect(() => {
    (async () => {
      await fetchClientSecret(jwt);
      await fetchCustomerCards(jwt);
      if (stripe) {
        const pr = stripe.paymentRequest({
          country: 'US',
          currency: 'usd',
          total: {
            label: 'Update Card',
            amount: 0,
          },
          requestPayerName: true,
          requestPayerEmail: true,
        });

        pr.canMakePayment().then((result) => {
          if (result) {
            setPaymentRequest(pr);
          }
        });
      }
    })();
  }, [stripe]);

  const fetchClientSecret = async (token) => {
    try {
      const intent = await getSetupIntent(token);
      const data = intent.data.data.attributes
      setClientSecret(data.client_secret);
    } catch (error) {
      console.error('Error fetching client secret:', error);
    }
  };

  const fetchCustomerCards = async (token) => {
    try {
      const response = await axios.get('/api/customers/cards', { headers: { Authorization: `Bearer ${token}` } });
      setCards(response.data.cards);
    } catch (error) {
      console.error('Error fetching customer cards:', error);
    }
  };

  const handleCardSelection = (e) => {
    setSelectedCard(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setError(null);
    setSuccess(false);

    const card = elements.getElement(CardElement);

    const { error, setupIntent } = await stripe.confirmCardSetup(clientSecret, {
      payment_method: {
        card: card,
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setError(null);
      setSuccess(true);
      updateCustomerPaymentMethod(setupIntent.payment_method);
    }
  };

  const updateCustomerPaymentMethod = async (paymentMethodId) => {
    try {
      await axios.post('/api/customers/update-payment-method', { payment_method_id: paymentMethodId });
      await fetchCustomerCards(jwt);
    } catch (error) {
      console.error('Error updating customer payment method:', error);
    }
  };

  const addCard = async () => {
    // Implement the logic for adding a new card
  };

  const deleteCard = async (cardId) => {
    try {
      await axios.delete(`/api/customers/cards/${cardId}`);
      await fetchCustomerCards(jwt);
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  }

  return (
    <>
      <h3>Update Credit Card Information</h3>
      <h4>Existing Cards</h4>
      <ListGroup>
        {cards.map((card) => (
          <ListGroup.Item key={card.id}>
            <Form.Check
              type="radio"
              name="selectedCard"
              value={card.id}
              label={`${card.brand} ****${card.last4} - Exp: ${card.exp_month}/${card.exp_year}`}
              checked={selectedCard === card.id}
              onChange={handleCardSelection}
            />
            <Button variant="danger" onClick={() => deleteCard(card.id)}>
              Delete
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <form onSubmit={handleSubmit}>
        <CardElement />
        <Button type="submit" disabled={!stripe} className="mt-3">
          Update Card
        </Button>
        <Button variant="primary" onClick={addCard} className="mt-3">
          Add Card
        </Button>
      </form>
      {paymentRequest && (
        <>
          <h4 className="mt-4">Or use a digital wallet</h4>
          <PaymentRequestButtonElement
            options={{ paymentRequest }}
            className="mt-2"
            onBlur={() => { }}
            onClick={(event) => {
              event.preventDefault();

              paymentRequest
                .show()
                .then(async (result) => {
                  const { error, setupIntent } = await stripe.confirmCardSetup(
                    clientSecret,
                    {
                      payment_method: result.paymentMethod.id,
                    },
                    { handleActions: false }
                  );

                  if (error) {
                    setError(error.message);
                  } else {
                    setError(null);
                    setSuccess(true);
                    updateCustomerPaymentMethod(setupIntent.payment_method);
                  }

                  result.complete('success');
                })
                .catch((error) => {
                  setError(error.message);
                });
            }}
          />
        </>
      )}
      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      {success && (
        <Alert variant="success" className="mt-3">
          Card information updated successfully!
        </Alert>
      )}
    </>
  );
}

UpdateCard.propTypes = {
  jwt: PropTypes.string.isRequired,
};

export default UpdateCard;
