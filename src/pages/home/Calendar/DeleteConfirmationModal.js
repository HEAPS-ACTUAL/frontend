import React from 'react';

const DeleteConfirmationModal = ({ isOpen, onClose, onDeleteAll, onDeleteOne }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Delete Confirmation</h2>
                <p>Are you sure you want to delete the entire exam schedule for this exam?</p>
                <button onClick={onDeleteAll}>Delete Entire Schedule</button>
                <button onClick={onDeleteOne}>Delete Just This Date</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;
