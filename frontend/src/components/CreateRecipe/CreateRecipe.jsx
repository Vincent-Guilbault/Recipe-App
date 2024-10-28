import React, { useState } from 'react';
import axios from 'axios';
import './createRecipe.css';

function CreateRecipe({ categoryId, onRecipeCreated }) {
    const [showForm, setShowForm] = useState(false);
    const [errors, setErrors] = useState({ title: '', description: '', preparation_time: '', external_link: '' });
    const [recipeData, setRecipeData] = useState({
        title: '',
        description: '',
        preparation_time: '',
        external_link: ''
    });

    const handleCreateRecipe = (e) => {
        e.preventDefault();
        setErrors({}); // Clear any previous errors

        axios.post('/api/recipes', { ...recipeData, category_id: categoryId })
            .then(response => {
                setRecipeData({ title: '', description: '', preparation_time: '' });
                setShowForm(false);
                if (onRecipeCreated) {
                    onRecipeCreated(response.data); // Notify parent of the new recipe
                }
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
                    setErrors({ title: 'Failed to create recipe' });
                }
            });
    };

    return (
        <div className="create-recipe">
            {showForm ? (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="modal-title">Create Recipe</h2>
                            <button className="close-btn" onClick={() => setShowForm(false)}>
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleCreateRecipe}>
                                <div className={`input-group ${errors.title ? 'input-error' : ''}`}>
                                    <label htmlFor="title">Title</label>
                                    {errors.title && <p className="error-message">{errors.title}</p>}
                                    <input
                                        type="text"
                                        value={recipeData.title}
                                        onChange={(e) => setRecipeData({ ...recipeData, title: e.target.value })}
                                        placeholder="Enter recipe title"
                                        required
                                    />
                                </div>
                                <div className={`input-group ${errors.description ? 'input-error' : ''}`}>
                                    <label htmlFor="description">Description</label>
                                    {errors.description && <p className="error-message">{errors.description}</p>}
                                    <textarea
                                        value={recipeData.description}
                                        onChange={(e) => setRecipeData({ ...recipeData, description: e.target.value })}
                                        placeholder="Enter recipe description"
                                    />
                                </div>
                                <div className={`input-group ${errors.preparation_time ? 'input-error' : ''}`}>
                                    <label htmlFor="preparation_time">Preparation time</label>
                                    {errors.preparation_time && <p className="error-message">{errors.preparation_time}</p>}
                                    <input
                                        type="number"
                                        value={recipeData.preparation_time}
                                        onChange={(e) => setRecipeData({ ...recipeData, preparation_time: e.target.value })}
                                        placeholder="Preparation time (in minutes)"
                                    />
                                </div>
                                <div className={`input-group ${errors.external_link ? 'input-error' : ''}`}>
                                    <label htmlFor="external_link">External Link</label>
                                    {errors.external_link && <p className="error-message">{errors.external_link}</p>}
                                    <input
                                        type="text"
                                        value={recipeData.external_link}
                                        onChange={(e) => setRecipeData({ ...recipeData, external_link: e.target.value })}
                                        placeholder="Enter recipe's link"
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
                <button onClick={() => setShowForm(true)} className="outline-btn">+ Add Recipe</button>
            )}
        </div>
    );
}

export default CreateRecipe;
