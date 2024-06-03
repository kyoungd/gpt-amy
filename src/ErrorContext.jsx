import React, { createContext, useContext, useState } from 'react';

// ErrorContext creation
const ErrorContext = createContext();

// Custom hook to use the error context
export const useError = () => useContext(ErrorContext);

// ErrorMessage component definition
const ErrorMessage = ({ message, onClose }) => {
  // Inline styles for the error message
  const containerStyle = {
    backgroundColor: '#f8d7da', // Light red background
    color: '#721c24', // Dark text color
    padding: '10px',
    borderRadius: '5px',
    margin: '10px 0',
    position: 'fixed', // Overlay content
    right: '20px',
    top: '20px',
    zIndex: 1000, // Above other content
    boxShadow: '0 0 10px rgba(0,0,0,0.1)' // Subtle shadow
  };

  const closeButtonStyle = {
    float: 'right',
    fontSize: '20px',
    lineHeight: '20px',
    cursor: 'pointer',
    color: '#000'
  };

  return (
    <div style={containerStyle}>
      <span style={closeButtonStyle} onClick={onClose}>&times;</span>
      {message}
    </div>
  );
};

// ErrorProvider component definition
export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState('');
  const [show, setShow] = useState(false);

  const showError = (message) => {
    setError(message);
    setShow(true);
    // Option to automatically hide after some time
    setTimeout(() => setShow(false), 5000);
  };

  return (
    <ErrorContext.Provider value={{ showError }}>
      {children}
      {show && <ErrorMessage message={error} onClose={() => setShow(false)} />}
    </ErrorContext.Provider>
  );
};
