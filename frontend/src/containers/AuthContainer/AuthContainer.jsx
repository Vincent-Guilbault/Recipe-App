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
            <h1 className="app-title">RecipePlanner</h1>
            <p className="welcome-message">Welcome Back</p>
            <div className="auth-buttons">
                <button className="sign-in-btn" onClick={handleSignIn}>Sign In</button>
                <button className="sign-up-btn" onClick={handleSignUp}>Sign Up</button>
            </div>

            <div className={`auth-form-container ${showForm ? 'show' : ''}`}>
                {showLogin ? (
                    <Login setUser={setUser} />
                ) : (
                    <Register setUser={setUser} />
                )}
            </div>
        </div>
    );
}

export default AuthContainer;
