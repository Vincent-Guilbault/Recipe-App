import React from 'react';
import './navbar.css';

function Navbar({ setSection }) {
    return (
        <div className="navbar">
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
