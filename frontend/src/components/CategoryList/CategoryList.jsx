import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './categoryList.css';
import CreateRecipe from '../CreateRecipe/CreateRecipe';
import CreateCategory from '../CreateCategory/CreateCategory';
import RecipeModal from '../RecipeModal/RecipeModal';

function CategoryList() {
    const [categories, setCategories] = useState([]);
    const [expandedCategories, setExpandedCategories] = useState({});
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    useEffect(() => {
        axios.get('/api/categories')
            .then(response => {
                if (Array.isArray(response.data)) {
                    setCategories(response.data);
                } else {
                    setCategories([]);
                }
            })
            .catch(error => {
                console.error('Error fetching categories', error);
            });
    }, []);

    const handleCategoryCreated = (newCategory) => {
        setCategories([...categories, newCategory]);
    };

    const handleToggleCategory = (categoryId) => {
        setExpandedCategories(prev => ({
            ...prev,
            [categoryId]: !prev[categoryId],
        }));
    };

    const handleRecipeCreated = (categoryId, newRecipe) => {
        setCategories(categories.map(category => {
            if (category.id === categoryId) {
                return {
                    ...category,
                    recipes: [...(category.recipes || []), newRecipe]
                };
            }
            return category;
        }));
    };

    // Handle recipe deletion
    const handleDeleteRecipe = (recipeId) => {
        axios.delete(`/api/recipes/${recipeId}`)
            .then(() => {
                // Remove the deleted recipe from state immutably
                const updatedCategories = categories.map(category => ({
                    ...category,
                    recipes: category.recipes.filter(recipe => recipe.id !== recipeId),
                }));
                setCategories(updatedCategories); // Update categories without the deleted recipe
                setSelectedRecipe(null);  // Close modal after deletion
            })
            .catch(error => {
                console.error('Error deleting recipe', error);
            });
    };

    const handleRecipeClick = (recipe) => {
        setSelectedRecipe(recipe);
    };

    const handleCloseModal = () => {
        setSelectedRecipe(null);
    };

    const handleSaveRecipe = (updatedRecipe) => {
        // Update the selected recipe in the category list
        setCategories(categories.map(category => {
            if (category.id === selectedRecipe.category_id) {
                return {
                    ...category,
                    recipes: category.recipes.map(recipe =>
                        recipe.id === selectedRecipe.id ? { ...recipe, ...updatedRecipe } : recipe
                    )
                };
            }
            return category;
        }));
        setSelectedRecipe(null);  // Close modal after saving
    };

    return (
        <div className="category-list">
            <div className="create-category-container">
                <CreateCategory onCategoryCreated={handleCategoryCreated} />
            </div>

            {categories.length === 0 ? (
                <p>No categories yet. Create your first category to get started!</p>
            ) : (
                categories.map(category => (
                    <div key={category.id} className="category-item">
                        <div className="category-header" onClick={() => handleToggleCategory(category.id)}>
                            <h3>{category.name}</h3>
                            <span className="arrow">
                                {expandedCategories[category.id] ?
                                    <span className="material-symbols-outlined">keyboard_arrow_down</span>
                                    :
                                    <span className="material-symbols-outlined">keyboard_arrow_up</span>
                                }
                            </span>
                        </div>
                        {expandedCategories[category.id] && (
                            <div className="category-recipes">
                                <ul>
                                    {category.recipes && category.recipes.length > 0 ? (
                                        category.recipes.map(recipe => (
                                            <li key={recipe.id} className="recipe-item" onClick={() => handleRecipeClick(recipe)}>
                                                <div className="recipe-info">
                                                    <span>{recipe.title}</span>
                                                    {recipe.preparation_time && (
                                                        <span className="preparation-time">
                                                            {recipe.preparation_time} Minutes
                                                        </span>
                                                    )}
                                                </div>
                                            </li>
                                        ))
                                    ) : (
                                        <li key={category.id} className="recipe-item">
                                            <p>No recipes in this category yet.</p>
                                        </li>
                                    )}
                                </ul>
                                <CreateRecipe categoryId={category.id} onRecipeCreated={(newRecipe) => handleRecipeCreated(category.id, newRecipe)} />
                            </div>
                        )}
                    </div>
                ))
            )}

            {/* Render Recipe Modal */}
            {selectedRecipe && <RecipeModal recipe={selectedRecipe} onClose={handleCloseModal} onSave={handleSaveRecipe} onDelete={handleDeleteRecipe} />}
        </div>
    );
}

export default CategoryList;
