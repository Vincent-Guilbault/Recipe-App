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
            <h1>Your Weekly Menu</h1>
            <button className="generate-menu-btn" onClick={handleGenerateMenu}>Generate Weekly Menu</button>
            <div className="menu-days">
                {menu.map((day, index) => (
                    <MenuDay key={index} day={day} onReroll={handleRerollDay}/>
                ))}
            </div>
        </div>
    );
}

export default MenuContainer;
