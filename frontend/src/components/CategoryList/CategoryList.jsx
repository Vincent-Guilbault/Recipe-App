import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './categoryList.css';
import CreateRecipe from '../CreateRecipe/CreateRecipe';
import CreateCategory from '../CreateCategory/CreateCategory';
import RecipeModal from '../RecipeModal/RecipeModal';
import CategoryModal from '../CategoryModal/CategoryModal';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';

function CategoryList() {
    const [categories, setCategories] = useState([]);
    const [expandedCategories, setExpandedCategories] = useState({});
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);

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

    const handleSaveCategory = (updatedCategory) => {
        setCategories(categories.map(category =>
            category.id === updatedCategory.id
            ? { ...updatedCategory, recipes: category.recipes }  // Preserve existing recipes
            : category
        ));
        setSelectedCategory(null);  // Close the modal after saving
    };

    // Open confirmation modal for delete
    const handleDeleteCategory = (category) => {
        setCategoryToDelete(category);
        setShowConfirmation(true);
    };

    // Confirm delete and remove the category
    const confirmDeleteCategory = () => {
        if (categoryToDelete) {
            axios.delete(`/api/categories/${categoryToDelete.id}`)
                .then(() => {
                    setCategories(categories.filter(category => category.id !== categoryToDelete.id));
                    setShowConfirmation(false);
                    setCategoryToDelete(null);
                })
                .catch(error => {
                    console.error('Error deleting category', error);
                    setShowConfirmation(false);
                });
        }
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

    // Handle recipe modification
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

    const handleCloseModal = () => {
        setSelectedRecipe(null);
    };

    return (
        <div className="category-list">
            <div className="create-category-container">
                <CreateCategory onCategoryCreated={handleCategoryCreated} />
            </div>

            {categories.length === 0 ? (
                <div className="advice-message">
                    <p>No categories yet. Create your first category to get started!</p>
                </div>
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
                                            <li key={recipe.id} className="recipe-item" onClick={() => setSelectedRecipe(recipe)}>
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
                                <div className="category-recipes-footer">
                                    <CreateRecipe categoryId={category.id} onRecipeCreated={(newRecipe) => handleRecipeCreated(category.id, newRecipe)} />
                                    <div className="category-settings">
                                        <button className='outline-btn' onClick={() => setSelectedCategory(category)}>Edit</button>
                                        <button className='outline-btn' onClick={() => handleDeleteCategory(category)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))
            )}

            {/* Render Recipe Modal */}
            {selectedRecipe && <RecipeModal recipe={selectedRecipe} onClose={handleCloseModal} onSave={handleSaveRecipe} onDelete={handleDeleteRecipe} />}
            {selectedCategory && (
                <CategoryModal
                    category={selectedCategory}
                    onClose={() => setSelectedCategory(null)}
                    onSave={handleSaveCategory}
                />
            )}

            {/* Render Confirmation Modal */}
            <ConfirmationModal
                show={showConfirmation}
                onConfirm={confirmDeleteCategory}
                onCancel={() => setShowConfirmation(false)}
                message={`Are you sure you want to delete the category "${categoryToDelete?.name}"?`}
            />
        </div>
    );
}

export default CategoryList;
