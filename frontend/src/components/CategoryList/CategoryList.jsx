import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './categoryList.css';
import CreateRecipe from '../CreateRecipe/CreateRecipe';
import CreateCategory from '../CreateCategory/CreateCategory';

function CategoryList() {
    const [categories, setCategories] = useState([]);
    const [expandedCategories, setExpandedCategories] = useState({});

    useEffect(() => {
        // Fetch categories and their recipes when component mounts
        axios.get('/api/categories')
            .then(response => {
                if (Array.isArray(response.data)) {
                    setCategories(response.data);
                } else {
                    setCategories([]);  // Set to an empty array if response is not an array
                }
            })
            .catch(error => {
                console.error('Error fetching categories', error);
            });
    }, []);

    const handleCategoryCreated = (newCategory) => {
        setCategories([...categories, newCategory]);
    };

    // Toggle expand/collapse for a category
    const handleToggleCategory = (categoryId) => {
        setExpandedCategories((prev) => ({
            ...prev,
            [categoryId]: !prev[categoryId],
        }));
    };

    const handleRecipeCreated = (categoryId, newRecipe) => {
        // Update the categories list with the new recipe
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

    return (
        <div className="category-list">
            <CreateCategory onCategoryCreated={handleCategoryCreated} />

            {categories.length === 0 ? (
                <p>No categories yet. Create your first category to get started!</p>
            ) : (
                categories.map(category => (
                    <div key={category.id} className="category-item">
                        <div className="category-header" onClick={() => handleToggleCategory(category.id)}>
                            <h3>
                                {category.name}
                                <span className="arrow">
                                    {expandedCategories[category.id] ?
                                        <span className="material-symbols-outlined">
                                        keyboard_arrow_down
                                        </span>
                                        :
                                        <span className="material-symbols-outlined">
                                        keyboard_arrow_up
                                        </span>
                                    }
                                </span>
                            </h3>
                        </div>
                        {expandedCategories[category.id] && (
                            <div className="category-recipes">
                                {/* Render the list of recipes here */}
                                <ul>
                                    {category.recipes && category.recipes.length > 0 ? (
                                        category.recipes.map(recipe => (
                                            <li key={recipe.id}>{recipe.title}</li>
                                        ))
                                    ) : (
                                        <p>No recipes in this category yet.</p>
                                    )}
                                </ul>
                                <CreateRecipe categoryId={category.id} onRecipeCreated={(newRecipe) => handleRecipeCreated(category.id, newRecipe)} />
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}

export default CategoryList;
