import React from 'react';
import axios from 'axios';
import './profile.css'

function Profile({ user, setUser }) {  // Use props from App.js
    const handleLogout = () => {
        axios.post('/api/logout', {}, { withCredentials: true })
            .then(() => {
                // Clear the user state after successful logout
                setUser(null);
            })
            .catch(error => {
                console.error('Logout failed', error);
            });
    };

    return (
        <div className="profile-container">
            <div className="profile-content">
                <h1>Your Profile</h1>
                {/* If the user is authenticated, show their name and a logout button */}
                {user ? (
                    <div>
                        {/* Show the user's name with a label and a input to be able to edit it */}
                        <div>
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={user.name}
                                onChange={(e) => setUser({ ...user, name: e.target.value })}
                            />
                            {/* Button to save the user's changes */}
                            <button
                                className='primary-btn'
                                onClick={() => {
                                    axios.put('/api/user', user, { withCredentials: true })
                                        .then(response => {
                                            setUser(response.data);
                                        })
                                        .catch(error => {
                                            console.error('Update failed', error);
                                        });
                                }}
                            >
                                Save
                            </button>
                        </div>
                        {/* Show the user's email with a label and a input to be able to edit it */}
                        <div>
                            <label htmlFor="email">Email:</label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                value={user.email}
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                            />
                            {/* Button to save the user's changes */}
                            <button
                                className='primary-btn'
                                onClick={() => {
                                    axios.put('/api/user', user, { withCredentials: true })
                                        .then(response => {
                                            setUser(response.data);
                                        })
                                        .catch(error => {
                                            console.error('Update failed', error);
                                        });
                                }}
                            >
                                Save
                            </button>
                        </div>
                        {/* Input to be able to edit the user's password */}
                        <div>
                            <label htmlFor="password">New Password:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={user.password || ''}  // Default to empty string if password is undefined
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                            />
                            {/* Input to confirm the user's new password */}
                            <label htmlFor="password_confirmation">Confirm New Password:</label>
                            <input
                                type="password"
                                id="password_confirmation"
                                name="password_confirmation"
                                value={user.password_confirmation || ''}  // Default to empty string if password_confirmation is undefined
                                onChange={(e) => setUser({ ...user, password_confirmation: e.target.value })}
                            />
                            {/* Button to save the user's changes */}
                            <button
                                className='primary-btn'
                                onClick={() => {
                                    axios.put('/api/user', user, { withCredentials: true })
                                        .then(response => {
                                            if (user.password) {
                                                // If password was changed, log the user out
                                                setUser(null);  // Clear the user state to trigger re-render
                                                // Force a page reload to reset any stale sessions or cookies
                                                window.location.reload();
                                            } else {
                                                // If no password change, just update the user data
                                                setUser(response.data);
                                            }
                                        })
                                        .catch(error => {
                                            console.error('Update failed', error);
                                        });
                                }}
                            >
                                Save
                            </button>
                        </div>
                        <button className="secondary-btn logout-btn" onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    // Show the login button if the user is not authenticated
                    <button className="primary-btn" onClick={() => window.location.href = '/login'}>Login</button>
                )}
            </div>
        </div>
    );
}

export default Profile;
