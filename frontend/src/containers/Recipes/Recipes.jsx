import React from 'react';
import './recipes.css';
import CategoryList from '../../components/CategoryList/CategoryList';

function Recipes() {
  return (
    <div className="recipes-container">
        <h1>Your Recipes</h1>

        <div className="recipe-list">
            <CategoryList />
        </div>
    </div>
  )
}

export default Recipes
