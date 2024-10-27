import React, { useState } from 'react';
import Login from '../../components/Login/Login';
import Register from '../../components/Register/Register';
import './authContainer.css';

function AuthContainer({ setUser }) {
    const [showLogin, setShowLogin] = useState(true);
    const [showForm, setShowForm] = useState(false);  // Toggle for animation

    const handleSignIn = () => {
        setShowLogin(true);
        setShowForm(true);  // Trigger animation
    };

    const handleSignUp = () => {
        setShowLogin(false);
        setShowForm(true);  // Trigger animation
    };

    return (
        <div className="auth-container">

            {/* Header for Login/Register with transition */}
            <div className={`auth-form-header ${showForm ? 'show' : ''}`}>
                <h2>{showLogin ? 'Hello \n Sign In' : 'Create \n Your Account'}</h2>
            </div>

            <h1 className="app-title">Meal Planner</h1>
            <p className="welcome-message">Eat Smart, Live Well</p>
            <div className="auth-buttons">
                <button className="contrast-btn" onClick={handleSignIn}>Sign In</button>
                <button className="secondary-btn" onClick={handleSignUp}>Sign Up</button>
            </div>

            <div className={`auth-form-container ${showForm ? 'show' : ''}`}>
                {showLogin ? (
                    // Render the login form if showLogin is true
                    <Login setUser={setUser} setShowLogin={setShowLogin} />
                ) : (
                    // Render the register form if showLogin is false
                    <Register setUser={setUser} setShowLogin={setShowLogin} />
                )}
            </div>
        </div>
    );
}

export default AuthContainer;
