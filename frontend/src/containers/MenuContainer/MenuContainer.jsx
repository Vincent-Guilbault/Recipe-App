import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './menuContainer.css';
import MenuDay from '../../components/MenuDay/MenuDay';

function MenuContainer() {
    const [menu, setMenu] = useState([]);

    // Fetch the existing menu when the component mounts
    useEffect(() => {
        axios.get('/api/weekly-menu')
            .then(response => {
                if (response.data && Array.isArray(response.data.days)) {
                    setMenu(response.data.days);
                } else {
                    setMenu([]);  // Set to an empty array if response is not an array
                }
            })
            .catch(error => {
                console.error('Error fetching menu', error);
            });
    }, []);

    const handleRerollDay = (dayId, newDayData) => {
        setMenu(menu.map(day => (day.id === dayId ? newDayData : day)));
    };

    const handleGenerateMenu = () => {
        axios.post('/api/generate-weekly-menu')
            .then(response => {
                if (response.data && Array.isArray(response.data.days)) {
                    setMenu(response.data.days);  // Set the menu state with the days array from the response
                } else {
                    setMenu([]);  // Set to an empty array if the response is not in the expected format
                }
            })
            .catch(error => {
                console.error('Error generating weekly menu', error);
            });
    };

    return (
        <div className="menu-container">
            <div className="menu-content">
                <h1>Your Weekly Menu</h1>
                <button className="primary-btn generate-menu-btn" onClick={handleGenerateMenu}>Generate Weekly Menu</button>

                {menu.length === 0 && (
                    // Display a message if menu is empty
                    <div className="advice-message">
                        <p>Welcome to your weekly menu! Before generating a menu, please make sure to add some recipes for better results!</p>
                    </div>
                )}


                <div className="menu-days">
                    {menu.map((day, index) => (
                        <MenuDay key={index} day={day} onReroll={handleRerollDay}/>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MenuContainer;
