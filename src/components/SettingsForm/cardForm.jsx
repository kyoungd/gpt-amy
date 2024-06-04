import React from 'react';
import PropTypes from 'prop-types';
import { addCard, editCard, deleteCard } from '../../utils/stripe-subscriptions';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Card, Col, Row } from 'react-bootstrap';

const validateCardForm = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = 'Required';
  }

  if (!values.number) {
    errors.number = 'Required';
  }

  if (!values.expMonth) {
    errors.expMonth = 'Required';
  }

  if (!values.expYear) {
    errors.expYear = 'Required';
  }

  if (!values.cvc) {
    errors.cvc = 'Required';
  }

  if (!values.postalCode) {
    errors.postalCode = 'Required';
  }

  return errors;
};

const CardForm = ({ token, card, onCardUpdated }) => {
  const initialValues = {
    name: card ? card.name : '',
    number: card ? card.number : '',
    expMonth: card ? card.expMonth : '',
    expYear: card ? card.expYear : '',
    cvc: card ? card.cvc : '',
    postalCode: card ? card.postalCode : '',
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (!card) {
        // Create a new card
        const cardDetails = {
          name: values.name,
          number: values.number,
          exp_month: values.expMonth,
          exp_year: values.expYear,
          cvc: values.cvc,
          postal_code: values.postalCode,
        };
        await addCard(token, cardDetails);
      } else {
        // Update an existing card
        const cardDetails = {
          name: values.name,
          exp_month: values.expMonth,
          exp_year: values.expYear,
          postal_code: values.postalCode,
        };
        await editCard(token, card.id, cardDetails);
      }

      onCardUpdated();
    } catch (error) {
      console.error('Error processing card:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      // Handle card deletion
      if (card) {
        await deleteCard(token, card.id);
        onCardUpdated();
      }
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  return (
    <Card className="p-3">
      <Formik initialValues={initialValues} validate={validateCardForm} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <Row className="mb-3">
              <Col>
                <label htmlFor="name">Name</label>
                <Field name="name" className="form-control" />
                <ErrorMessage name="name" component="div" className="text-danger" />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <label htmlFor="number">Card Number</label>
                <Field name="number" className="form-control" />
                <ErrorMessage name="number" component="div" className="text-danger" />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <label htmlFor="expMonth">Expiration Month</label>
                <Field name="expMonth" className="form-control" />
                <ErrorMessage name="expMonth" component="div" className="text-danger" />
              </Col>
              <Col>
                <label htmlFor="expYear">Expiration Year</label>
                <Field name="expYear" className="form-control" />
                <ErrorMessage name="expYear" component="div" className="text-danger" />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <label htmlFor="cvc">CVC</label>
                <Field name="cvc" className="form-control" />
                <ErrorMessage name="cvc" component="div" className="text-danger" />
              </Col>
              <Col>
                <label htmlFor="postalCode">Postal Code</label>
                <Field name="postalCode" className="form-control" />
                <ErrorMessage name="postalCode" component="div" className="text-danger" />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Button type="submit" className="me-2" disabled={isSubmitting}>
                  {card ? 'Update Card' : 'Add Card'}
                </Button>
                {card && (
                  <Button
                    variant="danger"
                    onClick={handleDelete}
                    disabled={isSubmitting}
                  >
                    Delete Card
                  </Button>
                )}
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

CardForm.propTypes = {
  token: PropTypes.string.isRequired,
  card: PropTypes.object,
  onCardUpdated: PropTypes.func.isRequired,
};

export default CardForm;
