import React, { useState } from 'react';
import axios from 'axios';
import './recipeModal.css';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';

function RecipeModal({ recipe, onClose, onSave, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);  // Track editing mode
    const [showConfirmation, setShowConfirmation] = useState(false);
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
        // Send the updated recipe data to the backend
        axios.put(`/api/recipes/${recipe.id}`, editRecipe)
            .then(response => {
                onSave(response.data);  // Update the recipe in the parent component
                setIsEditing(false);  // Exit editing mode
            })
            .catch(error => {
                console.error('Error updating the recipe', error);
            });
    };

    const handleCancel = () => {
        setIsEditing(false);  // Exit editing mode without saving
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
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={editRecipe.title}
                                onChange={handleInputChange}
                                className="edit-input"
                            />

                            <label htmlFor="description">Description</label>
                            <textarea
                                name="description"
                                value={editRecipe.description || ""}
                                onChange={handleInputChange}
                                className="edit-textarea"
                            />

                            <label htmlFor="preparation_time">Preparation Time</label>
                            <input
                                type="number"
                                name="preparation_time"
                                value={editRecipe.preparation_time || ""}
                                onChange={handleInputChange}
                                className="edit-input"
                            />

                            <label htmlFor="external_link">External Link</label>
                            <input
                                type="url"
                                name="external_link"
                                value={editRecipe.external_link || ""}
                                onChange={handleInputChange}
                                className="edit-input"
                            />
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
