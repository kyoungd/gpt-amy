import React from 'react';
import PropTypes from 'prop-types';

const PopupDialog = ({ show, onClose, text }) => {
    if (!show) {
        return null;
    }

    const modalStyle = {
        zIndex: 10050, // High z-index to ensure it's on top
    };

    return (
        <div className="modal show d-block" tabIndex="-1" style={modalStyle}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Additional Information</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <pre style={{ textAlign: 'left' }}>{text}</pre>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

PopupDialog.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired
};

export default PopupDialog;
