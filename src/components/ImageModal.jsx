import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

const ImageModal = ({ imageUrl, linkText }) => {
  const [show, setShow] = useState(true);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <Button variant="link" onClick={handleShow}>
        {linkText}
      </Button>
      
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={imageUrl} alt="Full size" style={{ maxWidth: '100%', maxHeight: '80vh' }} />
        </Modal.Body>
      </Modal>
    </>
  );
};

ImageModal.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
};

export default ImageModal;
