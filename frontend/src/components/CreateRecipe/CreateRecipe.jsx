import React, { useState } from 'react';
import axios from 'axios';
import './createRecipe.css';

function CreateRecipe({ categoryId, onRecipeCreated }) {
    const [showForm, setShowForm] = useState(false);
    const [recipeData, setRecipeData] = useState({
        title: '',
        description: '',
        preparation_time: ''
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
                <form onSubmit={handleCreateRecipe}>
                    <input
                        type="text"
                        value={recipeData.title}
                        onChange={(e) => setRecipeData({ ...recipeData, title: e.target.value })}
                        placeholder="Enter recipe title"
                        required
                    />
                    <textarea
                        value={recipeData.description}
                        onChange={(e) => setRecipeData({ ...recipeData, description: e.target.value })}
                        placeholder="Enter recipe description"
                    />
                    <input
                        type="number"
                        value={recipeData.preparation_time}
                        onChange={(e) => setRecipeData({ ...recipeData, preparation_time: e.target.value })}
                        placeholder="Preparation time (in minutes)"
                    />
                    <button type="submit">Create</button>
                    <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
                </form>
            ) : (
                <button onClick={() => setShowForm(true)} className="create-recipe-btn">+ Add Recipe</button>
            )}
        </div>
    );
}

export default CreateRecipe;
