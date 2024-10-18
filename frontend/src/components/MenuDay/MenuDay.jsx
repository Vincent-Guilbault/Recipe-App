import React from 'react';
import axios from 'axios';
import './menuDay.css';

function MenuDay({ day, onReroll }) {

    const handleReroll = () => {
        axios.post(`/api/reroll-day/${day.id}`)
            .then(response => {
                onReroll(day.id, response.data);  // Update the day with the new recipe
            })
            .catch(error => {
                console.error('Error rerolling the recipe', error);
            });
    };

    return (
        <div className="menu-day">
            <div className='menu-day-header'>
                <h3>{day.day_name}</h3>
                <button onClick={handleReroll} className="reroll-btn">
                    <span className="material-symbols-outlined" title='Reroll'>
                        autorenew
                    </span>
                </button>
            </div>
            {day.recipe ? (
                <div className="recipe-details">
                    <h4>{day.recipe.title}</h4>
                    {day.recipe.external_link != null && day.recipe.external_link !== '' && (
                        <a href={day.recipe.external_link} className="external-link" target="_blank" rel="noopener noreferrer">
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
