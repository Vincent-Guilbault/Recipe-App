import React, { useState } from 'react';
import axios from 'axios';
import './categoryModal.css';

function CategoryModal({ category, onClose, onSave }) {
    const [newCategoryName, setNewCategoryName] = useState(category.name);

    const handleSave = () => {
        // Update category with the new name
        axios.put(`/api/categories/${category.id}`, { name: newCategoryName })
            .then(response => {
                onSave(response.data); // Pass updated category back to parent
                onClose(); // Close the modal after saving
            })
            .catch(error => {
                console.error('Error updating category', error);
            });
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Edit Category</h2>
                    <button className="close-btn" onClick={onClose}>
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
                <div className="modal-body">
                    <label>Category Name</label>
                    <input
                        type="text"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        className="edit-input"
                    />
                </div>
                <div className="modal-footer">
                    <button className="primary-btn" onClick={handleSave}>Save</button>
                    <button className="secondary-btn" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default CategoryModal;
