import React, { useState } from 'react';
import axios from 'axios';
import './createRecipe.css';

function CreateRecipe({ categoryId, onRecipeCreated }) {
    const [showForm, setShowForm] = useState(false);
    const [recipeData, setRecipeData] = useState({
        title: '',
        description: '',
        preparation_time: '',
        external_link: ''
    });

    const handleCreateRecipe = (e) => {
        e.preventDefault();

        axios.post('/api/recipes', { ...recipeData, category_id: categoryId })
            .then(response => {
                setRecipeData({ title: '', description: '', preparation_time: '' });
                setShowForm(false);
                if (onRecipeCreated) {
                    onRecipeCreated(response.data); // Notify parent of the new recipe
                }
            })
            .catch(error => {
                console.error('There was an error creating the recipe!', error);
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
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    value={recipeData.title}
                                    onChange={(e) => setRecipeData({ ...recipeData, title: e.target.value })}
                                    placeholder="Enter recipe title"
                                    required
                                />
                                <label htmlFor="description">Description</label>
                                <textarea
                                    value={recipeData.description}
                                    onChange={(e) => setRecipeData({ ...recipeData, description: e.target.value })}
                                    placeholder="Enter recipe description"
                                    required
                                />
                                <label htmlFor="preparation_time">Preparation time</label>
                                <input
                                    type="number"
                                    value={recipeData.preparation_time}
                                    onChange={(e) => setRecipeData({ ...recipeData, preparation_time: e.target.value })}
                                    placeholder="Preparation time (in minutes)"
                                />
                                <label htmlFor="external_link">External Link</label>
                                <input
                                    type="text"
                                    value={recipeData.external_link}
                                    onChange={(e) => setRecipeData({ ...recipeData, external_link: e.target.value })}
                                    placeholder="Enter recipe's link"
                                />
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
