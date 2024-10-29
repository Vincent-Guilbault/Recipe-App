import React, { useState } from 'react';
import axios from 'axios';
import './createCategory.css';

function CreateCategory({ onCategoryCreated }) {
    const [showForm, setShowForm] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [errors, setErrors] = useState({ name: '' });

    const handleCreateCategory = (e) => {
        e.preventDefault();
        setErrors({}); // Clear any previous errors

        axios.post('/api/categories', { name: categoryName })
            .then(response => {
                setCategoryName('');
                setShowForm(false);
                onCategoryCreated(response.data); // Notify parent of the new category
            })
            .catch(error => {
                if (error.response && error.response.status === 422) {
                    const responseErrors = error.response.data.errors || {};
                    setErrors({
                        name: responseErrors.name ? responseErrors.name[0] : '',
                    });
                } else {
                    setErrors({ name: 'Failed to create category' });
                }
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
                                <div className={`input-group ${errors.name ? 'input-error' : ''}`}>
                                    <label>Category Name</label>
                                    {errors.name && <p className="error-message">{errors.name}</p>}
                                    <input
                                        type="text"
                                        value={categoryName}
                                        onChange={(e) => setCategoryName(e.target.value)}
                                        placeholder="Enter category name"
                                        required
                                    />
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="primary-btn">Create</button>
                                    <button type="button" className="secondary-btn" onClick={() => setShowForm(false)}>Cancel</button>
                                </div>
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
