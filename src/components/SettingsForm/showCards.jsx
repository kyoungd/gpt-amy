import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getCards, updatePaymentMethod } from '../../utils/stripe-subscriptions';
import { Button } from '../ui/button';

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
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Your Credit Cards</h3>
        <Button variant="default" onClick={() => AddCreditCard(token)}>
          Add Card
        </Button>
      </div>
      <div className="space-y-2">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`flex items-center justify-between p-4 border rounded-lg ${index < cards.length - 1 ? 'border-b' : ''}`}
          >
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                name="cards"
                id={`card-${card.id}`}
                value={card.id}
                checked={selectedCard === card.id}
                onChange={() => handleCardChange(card.id)}
                className="mr-3"
              />
              <label htmlFor={`card-${card.id}`}>
                {card.card.brand} **** **** **** {card.card.last4} - Exp: {card.card.exp_month}/{card.card.exp_year}
              </label>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => EditCreditCard(token, card)}>
                Edit
              </Button>
              <Button variant="destructive" onClick={() => DeleteCreditCard(token, card)}>
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

ShowCards.propTypes = {
  token: PropTypes.string.isRequired,
};

export default ShowCards;
