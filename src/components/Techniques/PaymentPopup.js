/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import * as React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

PaymentPopup.propTypes = {
  id: PropTypes.string.isRequired
};

export default function PaymentPopup({id}) {
  return (
    <Link 
      className="btn btn-primary btn-hover-secondary mt-xl-8 mt-lg-8 mt-md-6 mt-4" 
      to={`${process.env.PUBLIC_URL}/checkout/agreement/${id}`}>
        Subscribe Now
    </Link>

  );
}
