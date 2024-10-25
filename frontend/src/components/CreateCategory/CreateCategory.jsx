import React, { useState } from 'react';
import axios from 'axios';
import './createCategory.css';

function CreateCategory({ onCategoryCreated }) {
    const [showForm, setShowForm] = useState(false);
    const [categoryName, setCategoryName] = useState('');

    const handleCreateCategory = (e) => {
        e.preventDefault();

        axios.post('/api/categories', { name: categoryName })
            .then(response => {
                setCategoryName('');
                setShowForm(false);
                onCategoryCreated(response.data); // Notify parent of the new category
            })
            .catch(error => {
                console.error('There was an error creating the category!', error);
            });
    };

    return (
        <div className="create-category">
            {showForm ? (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="modal-title">Create Category</h2>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleCreateCategory}>
                                <input
                                    type="text"
                                    value={categoryName}
                                    onChange={(e) => setCategoryName(e.target.value)}
                                    placeholder="Enter category name"
                                    required
                                />
                                <button type="submit" className="primary-btn">Create</button>
                                <button type="button" className="secondary-btn" onClick={() => setShowForm(false)}>Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>
            ) : (
                <button onClick={() => setShowForm(true)} className="primary-btn">+ New Category</button>
            )}
        </div>
    );
}

export default CreateCategory;
