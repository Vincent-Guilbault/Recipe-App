import React, { useEffect, useState } from 'react';
import axios from 'axios';

function RecipeList() {
    const [recipes, setRecipes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [newRecipe, setNewRecipe] = useState({
        title: '',
        description: '',
        preparation_time: '',
        category_id: '',
    });

    useEffect(() => {
        // Fetch recipes when component mounts
        axios.get('/api/recipes')
            .then(response => {
                setRecipes(response.data);  // Set the fetched recipes in the state
            })
            .catch(error => {
                console.error('There was an error fetching the recipes!', error);
            });

        // Fetch categories when component mounts
        axios.get('/api/categories')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories', error);
            });
    }, []);

    // Handle form input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRecipe({ ...newRecipe, [name]: value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/recipes', newRecipe)
            .then(response => {
                // Add the newly created recipe to the state
                setRecipes([...recipes, response.data]);
                // Reset the form
                setNewRecipe({ title: '', description: '', preparation_time: '' });
            })
            .catch(error => {
                console.error('There was an error creating the recipe!', error);
            });
    };

    return (
        <div>
            <h1>Recipe List</h1>
            <ul>
                {recipes.map(recipe => (
                    <li key={recipe.id}>{recipe.title}</li>
                ))}
            </ul>

            <h2>Add a New Recipe</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={newRecipe.title}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={newRecipe.description}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Preparation Time (minutes):</label>
                    <input
                        type="number"
                        name="preparation_time"
                        value={newRecipe.preparation_time}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Category:</label>
                    <select name="category_id" value={newRecipe.category_id} onChange={handleInputChange}>
                        <option value="">Select Category</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <button type="submit">Add Recipe</button>
            </form>
        </div>
    );
}

export default RecipeList;
