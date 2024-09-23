import React, { useState } from 'react';
import Login from '../../components/Login/Login';
import Register from '../../components/Register/Register';

function AuthContainer({ setUser }) {
    const [showLogin, setShowLogin] = useState(true);  // Toggle between login and register

    return (
        <div>
            {showLogin ? (
                <>
                    <Login setUser={setUser} />
                    <p>Don't have an account? <button onClick={() => setShowLogin(false)}>Register</button></p>
                </>
            ) : (
                <>
                    <Register setUser={setUser} />
                    <p>Already have an account? <button onClick={() => setShowLogin(true)}>Login</button></p>
                </>
            )}
        </div>
    );
}

export default AuthContainer;
