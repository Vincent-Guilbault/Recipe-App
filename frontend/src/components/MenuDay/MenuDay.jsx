import React from 'react';
import './menuDay.css';

function MenuDay({ day }) {

    return (
        <div className="menu-day">
            <h3>{day.day_name}</h3>
            {day.recipe ? (
                <div className="recipe-details">
                    <h4>{day.recipe.title}</h4>
                    {day.recipe.external_link != null && day.recipe.external_link !== '' && (
                        <a href={day.recipe.external_link} className="external-link">
                            <p>View Recipe</p>
                        </a>
                    )}
                    {day.recipe.preparation_time != null && day.recipe.preparation_time !== '' && (
                        <p>
                            Preparation Time: {day.recipe.preparation_time} Minutes
                        </p>
                    )}
                </div>
            ) : (
                <p>No recipe assigned.</p>
            )}
        </div>
    );
}

export default MenuDay;
