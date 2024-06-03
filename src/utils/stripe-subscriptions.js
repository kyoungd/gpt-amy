import axios from 'axios';
import * as Sentry from "@sentry/react";

// export async function getPrices() {
//   const { data } = await axios.get('/prices');
//   data.forEach((price) => {
//     price.nickname = price.product.name;
//     return price;
//   });
//   console.log('prices get request', data);
//   return data;
// }

function makeBearToken(token) {
  return {
    'headers': {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };
}

export async function createSubscription(token, subscriptionPriceId, setupPriceId) {
  try {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/subscriptions/url`;
    const { data } = await axios.post(
      url,
      {
        subscriptionPriceId: subscriptionPriceId,
        setupPriceId: setupPriceId
      },
      makeBearToken(token)
    );
    return data.data;  
  }
  catch (error) {
    Sentry.captureException(error);
    console.log(error);
    return null;
  }
}

export async function getSubscriptionManagement(token) {
  const api_url = `${process.env.REACT_APP_BACKEND_URL}/api/subscriptions/url`;
  const result = await axios.get(api_url, makeBearToken(token));
  const { attributes } = result.data.data;
  return attributes;
}

export async function getPaymentMethodManagement(token) {
  const api_url = `${process.env.REACT_APP_BACKEND_URL}/api/subscriptions/payment-methods`;
  const result = await axios.get(api_url, makeBearToken(token));
  console.log(result);
  const { attributes } = result.data.data;
  return attributes;
}


// export async function getSubscriptions(token, status) {
//   const url = `${process.env.REACT_APP_BACKEND_URL}/api/subscriptions/${status}`;
//   const { data } = await axios.get(url, makeBearToken(token));
//   const subs = data.data;
//   console.log('get subscriptions', subs);
//   return subs;
// }

// export async function deleteSubscription(token, subscriptionId) {
//   const url = `${process.env.REACT_APP_BACKEND_URL}/api/subscriptions/${subscriptionId}`;
//   const result = await axios.delete(url, makeBearToken(token));
//   console.log('delete subscriptions', result);
// }

// export async function getSetupIntent(token) {
//   const url = `${process.env.REACT_APP_BACKEND_URL}/api/setup-intent`;
//   const result = await axios.get(url, makeBearToken(token));
//   return result;
// }

// export async function addCard(token, paymentMethodId) {
//   const url = `${process.env.REACT_APP_BACKEND_URL}/api/credit-card`;
//   const result = await axios.post(
//     url,
//     {
//       paymentMethodId: paymentMethodId
//     },
//     makeBearToken(token)
//   );
//   return result;
// }

// export async function editCard(token, card) {
//   const paymentMethodId = card.id;
//   const url = `${process.env.REACT_APP_BACKEND_URL}/api/credit-card/${paymentMethodId}`;
  
//   const config = {
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`
//     }
//   };

//   const result = await axios.put(url, JSON.stringify(card), config);
//   return result;
// }

// export async function deleteCard(token, paymentMethodId) {
//   const url = `${process.env.REACT_APP_BACKEND_URL}/api/credit-card/${paymentMethodId}`;
//   const result = await axios.delete(url, makeBearToken(token));
//   return result;
// }

// export async function getCards(token) {
//   const url = `${process.env.REACT_APP_BACKEND_URL}/api/credit-card`;
//   const result = await axios.get(url, makeBearToken(token));
//   return result;
// }

// export async function updatePaymentMethod(token, paymentMethodId) {
//   const url = `${process.env.REACT_APP_BACKEND_URL}/api/payment-method/${paymentMethodId}`;
//   const result = await axios.put(url, makeBearToken(token));
//   return result;
// }
