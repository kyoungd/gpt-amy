import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types'; // Import PropTypes

function PopupConfirmation({ show, displayString, onConfirm, onHide }) {
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');

  // Generate a new code each time the modal is shown
  useEffect(() => {
    if (show) {
      const randomCode = Math.floor(1000 + Math.random() * 9000).toString();
      setCode(randomCode);
    }
  }, [show]);

  const handleConfirm = () => {
    if (input === code) {
      onConfirm(true);
      setInput(''); // Reset input on successful confirmation
      onHide(); // Optionally hide the modal on successful confirmation
    } else {
      alert('Incorrect code, please try again.');
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleConfirm();
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{displayString}</p>
        <p>Confirmation code: {code}</p>
        <Form.Control
          type="text"
          placeholder="Enter code"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress} // Listen for key press events
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

PopupConfirmation.propTypes = {
  show: PropTypes.bool.isRequired,
  displayString: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default PopupConfirmation;
