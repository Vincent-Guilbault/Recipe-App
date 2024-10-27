import React from 'react';
import './navbar.css';
import logo from '../../assets/Meal-Planner-Logo_White.svg';

function Navbar({ setSection }) {
    return (
        <div className="navbar">
            {/* Logo, visible only on screens wider than 768px */}
            <img
                src={logo}
                alt="Meal Planner Logo"
                className="navbar-logo"
            />

            {/* Icon for the Recipes */}
            <span className="material-symbols-outlined" onClick={() => setSection('recipes')}>
                local_dining
            </span>
            {/* Icon for the Menus */}
            <span className="material-symbols-outlined" onClick={() => setSection('menus')}>
                menu_book
            </span>
            {/* Icon for the Profile */}
            <span className="material-symbols-outlined" onClick={() => setSection('profile')}>
                account_circle
            </span>
        </div>
    );
}

export default Navbar;
