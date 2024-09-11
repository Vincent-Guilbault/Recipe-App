import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './navbar.css';

function Navbar() {
    const [user, setUser] = useState(null);  // State to track the authenticated user

    // Fetch authenticated user info
    useEffect(() => {
        axios.get('/api/user', { withCredentials: true })
            .then(response => {
                setUser(response.data);  // Set user data if authenticated
            })
            .catch(() => {
                setUser(null);  // Set user to null if not authenticated
            });
    }, []);

    // Handle user logout
    const handleLogout = () => {
        axios.post('/api/logout', {}, { withCredentials: true })
            .then(() => {
                setUser(null);  // Reset user state to null on logout
            })
            .catch(error => {
                console.error('Logout failed', error);
            });
    };

    return (
        <div>
            <nav>
                <div className="navbar">
                    <h1>My App</h1>

                    {/* If the user is authenticated, show their name and a logout button */}
                    {user ? (
                        <div>
                            <span>Welcome, {user.name}</span>
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    ) : (
                        // Show the login button if the user is not authenticated
                        <button onClick={() => window.location.href = '/login'}>Login</button>
                    )}
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
