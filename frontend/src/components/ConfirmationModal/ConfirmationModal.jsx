import React from 'react';
import './confirmationModal.css';

function ConfirmationModal({ show, onConfirm, onCancel, message }) {
    if (!show) return null;

    return (
        <div className="confirmation-modal">
            <div className="confirmation-modal-content">
                <h4>Are you sure?</h4>
                <p>{message}</p>
                <div className="confirmation-modal-actions">
                    <button className="confirm-btn" onClick={onConfirm}>Yes</button>
                    <button className="cancel-btn" onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmationModal;
