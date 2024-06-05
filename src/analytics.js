// src/analytics.js
import ReactGA from 'react-ga4';

export const initGA = () => {
  ReactGA.initialize('G-MZCZBCKWSQ'); // Replace with your Measurement ID
};

export const logPageView = () => {
  ReactGA.send({ hitType: 'pageview', page: window.location.pathname + window.location.search });
};
