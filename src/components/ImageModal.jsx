import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from './ui/button';

const ImageModal = ({ imageUrl, linkText }) => {
  const [show, setShow] = useState(true);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <Button variant="link" onClick={handleShow} className="p-0 h-auto">
        {linkText}
      </Button>
      
      {show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] w-full flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold">Image</h2>
              <Button variant="ghost" onClick={handleClose} className="p-1 h-auto">
                ✕
              </Button>
            </div>
            <div className="p-4 flex-1 overflow-auto">
              <img src={imageUrl} alt="Full size" className="max-w-full max-h-full object-contain mx-auto" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

ImageModal.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
};

export default ImageModal;
