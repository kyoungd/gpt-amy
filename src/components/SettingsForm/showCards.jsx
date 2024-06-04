import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getCards, updatePaymentMethod } from '../../utils/stripe-subscriptions';
import { ListGroup, Form, Button, ButtonGroup } from 'react-bootstrap';

const ShowCards = ({ token }) => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState(null);

  const fetchCards = async () => {
    try {
      const cardData = await getCards(token);
      setCards(cardData.data.cards);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cards:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const AddCreditCard = async (token) => {
    const emptyCreditCardData = {
      id: '',
      card: {
        brand: '',
        last4: '',
        exp_month: '',
        exp_year: ''
      }
    };
    const cardData = await EditCreditCard(token, emptyCreditCardData);
    return cardData;
  }

  const EditCreditCard = async (token, card) => {

  }

  const DeleteCreditCard = async (token, card) => {

  }

  const handleCardChange = async (paymentMethodId) => {
    try {
      await updatePaymentMethod(token, paymentMethodId);
      setSelectedCard(paymentMethodId);
    } catch (error) {
      console.error('Error updating payment method:', error);
    }
  };

  if (loading) {
    return <div>Loading cards...</div>;
  }

  return (
    <div className="my-4">
      <div className="d-flex justify-content-between">
        <h3>Your Credit Cards</h3>
        <Button variant="primary" onClick={() => AddCreditCard(token)}>
          Add Card
        </Button>
      </div>
      <ListGroup>
        {cards.map((card, index) => (
          <ListGroup.Item
            key={card.id}
            className={`d-flex align-items-center justify-content-between ${index < cards.length - 1 ? 'border-bottom' : ''}`}
          >
            <div className="d-flex align-items-center">
              <Form.Check
                type="radio"
                name="cards"
                value={card.id}
                checked={selectedCard === card.id}
                onChange={() => handleCardChange(card.id)}
                className="me-3"
              />
              <span>
                {card.card.brand} **** **** **** {card.card.last4} - Exp: {card.card.exp_month}/{card.card.exp_year}
              </span>
            </div>
            <ButtonGroup>
              <Button variant="outline-secondary" onClick={() => EditCreditCard(token, card)}>
                Edit
              </Button>
              <Button variant="outline-danger" onClick={() => DeleteCreditCard(token, card)}>
                Delete
              </Button>
            </ButtonGroup>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

ShowCards.propTypes = {
  token: PropTypes.string.isRequired,
};

export default ShowCards;
