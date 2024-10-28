import React, { useState } from 'react';
import axios from 'axios';
import './recipeModal.css';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';

function RecipeModal({ recipe, onClose, onSave, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);  // Track editing mode
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [errors, setErrors] = useState({ title: '', description: '', preparation_time: '', external_link: '' });
    const [editRecipe, setEditRecipe] = useState({
        title: recipe.title,
        description: recipe.description,
        preparation_time: recipe.preparation_time,
        external_link: recipe.external_link,
    });

    // Handle input changes when editing
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditRecipe({ ...editRecipe, [name]: value });
    };

    const handleSave = () => {
        setErrors({}); // Clear any previous errors

        // Send the updated recipe data to the backend
        axios.put(`/api/recipes/${recipe.id}`, editRecipe)
            .then(response => {
                onSave(response.data);  // Update the recipe in the parent component
                setIsEditing(false);  // Exit editing mode
            })
            .catch(error => {
                if (error.response && error.response.status === 422) {
                    const responseErrors = error.response.data.errors || {};
                    setErrors({
                        title: responseErrors.title ? responseErrors.title[0] : '',
                        description: responseErrors.description ? responseErrors.description[0] : '',
                        preparation_time: responseErrors.preparation_time ? responseErrors.preparation_time[0] : '',
                        external_link: responseErrors.external_link ? responseErrors.external_link[0] : ''
                    });
                } else {
                    setErrors({ title: 'Failed to edit recipe' });
                }
            });
    };

    const handleCancel = () => {
        setIsEditing(false);  // Exit editing mode without saving
        setErrors({}); // Clear any previous errors
    };

    const handleDelete = () => {
        setShowConfirmation(true);
    };

    const confirmDelete = () => {
        onDelete(recipe.id);  // Pass recipe ID to parent to handle deletion
        setShowConfirmation(false);
        onClose();  // Close the modal after deletion
    };

    const cancelDelete = () => {
        setShowConfirmation(false);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    {isEditing ? (
                        <h2>Edit Recipe</h2>
                    ) : (
                        <h2>{recipe.title}</h2>
                    )}
                    <button className="close-btn" onClick={onClose}>
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
                <div className="modal-body">
                    {isEditing ? (
                        <>
                            <div className={`input-group ${errors.title ? 'input-error' : ''}`}>
                                <label htmlFor="title">Title</label>
                                {errors.title && <p className="error-message">{errors.title}</p>}
                                <input
                                    type="text"
                                    name="title"
                                    value={editRecipe.title}
                                    onChange={handleInputChange}
                                    className="edit-input"
                                />
                            </div>

                            <div className={`input-group ${errors.description ? 'input-error' : ''}`}>
                                <label htmlFor="description">Description</label>
                                {errors.description && <p className="error-message">{errors.description}</p>}
                                <textarea
                                    name="description"
                                    value={editRecipe.description || ""}
                                    onChange={handleInputChange}
                                    className="edit-textarea"
                                />
                            </div>

                            <div className={`input-group ${errors.preparation_time ? 'input-error' : ''}`}>
                                <label htmlFor="preparation_time">Preparation Time</label>
                                {errors.preparation_time && <p className="error-message">{errors.preparation_time}</p>}
                                <input
                                    type="number"
                                    name="preparation_time"
                                    value={editRecipe.preparation_time || ""}
                                    onChange={handleInputChange}
                                    className="edit-input"
                                />
                            </div>

                            <div className={`input-group ${errors.external_link ? 'input-error' : ''}`}>
                                <label htmlFor="external_link">External Link</label>
                                {errors.external_link && <p className="error-message">{errors.external_link}</p>}
                                <input
                                    type="url"
                                    name="external_link"
                                    value={editRecipe.external_link || ""}
                                    onChange={handleInputChange}
                                    className="edit-input"
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            {recipe.preparation_time && (
                                <p><strong>Preparation Time:</strong> {recipe.preparation_time} minutes</p>
                            )}
                            <p className="description">{recipe.description}</p>
                            {recipe.external_link && (
                                <a href={recipe.external_link} target="_blank" rel="noopener noreferrer">
                                    View Recipe
                                </a>
                            )}
                        </>
                    )}
                </div>
                <div className="modal-footer">
                    {isEditing ? (
                        <>
                            <button className="primary-btn" onClick={handleSave}>Save</button>
                            <button className="secondary-btn" onClick={handleCancel}>Cancel</button>
                        </>
                    ) : (
                        <>
                            <button className="primary-btn" onClick={() => setIsEditing(true)}>Edit</button>
                            <button className="secondary-btn" onClick={handleDelete}>Delete</button>
                        </>
                    )}
                </div>
            </div>

            {/* Confirmation modal */}
            <ConfirmationModal
                show={showConfirmation}
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
                message={`Do you want to delete the recipe: "${recipe.title}"?`}
            />
        </div>
    );
}

export default RecipeModal;
