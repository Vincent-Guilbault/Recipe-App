import React from 'react';
import './menuDay.css';

function MenuDay({ day }) {
    return (
        <div className="menu-day">
            <h3>{day.day_name}</h3>  {/* Updated to use day.day_name */}
            {day.recipe ? (
                <div className="recipe-details">
                    <h4>{day.recipe.title}</h4>
                    <p>{day.recipe.description}</p>
                </div>
            ) : (
                <p>No recipe assigned.</p>
            )}
        </div>
    );
}

export default MenuDay;
