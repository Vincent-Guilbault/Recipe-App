import React, { useState } from 'react';
import axios from 'axios';
import './profile.css';

function Profile({ user, setUser }) {
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        password: '',
        password_confirmation: ''
    });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState(''); // Track success message

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = (field) => {
        axios.put('/api/user', formData, { withCredentials: true })
            .then(response => {
                setUser(response.data);
                setErrors({});
                setSuccessMessage(`${field.charAt(0).toUpperCase() + field.slice(1)} updated successfully!`);
                if (field === 'password') {
                    setUser(null);
                    window.location.reload();
                }

                // Clear the success message after 5 seconds
                setTimeout(() => setSuccessMessage(''), 6000);
            })
            .catch(error => {
                if (error.response && error.response.data.errors) {
                    setErrors(error.response.data.errors);
                } else {
                    console.error('Update failed', error);
                }
            });
    };

    const handleLogout = () => {
        axios.post('/api/logout', {}, { withCredentials: true })
            .then(() => setUser(null))
            .catch(error => console.error('Logout failed', error));
    };

    return (
        <div className="profile-container">
            <div className="profile-content">
                <h1>Your Profile</h1>
                {successMessage && <p className="success-message">{successMessage}</p>}
                {user ? (
                    <div>
                        <div className="profile-field">
                            <label htmlFor="name">Name:</label>
                            {errors.name && <p className="error-message">{errors.name[0]}</p>}
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className={errors.name ? 'error-input' : ''}
                            />
                            <button className="primary-btn" onClick={() => handleSave('name')}>Save</button>
                        </div>

                        <div className="profile-field">
                            <label htmlFor="email">Email:</label>
                            {errors.email && <p className="error-message">{errors.email[0]}</p>}
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className={errors.email ? 'error-input' : ''}
                            />
                            <button className="primary-btn" onClick={() => handleSave('email')}>Save</button>
                        </div>

                        <div className="profile-field">
                            <label htmlFor="password">New Password:</label>
                            {errors.password && <p className="error-message">{errors.password[0]}</p>}
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className={errors.password ? 'error-input' : ''}
                            />

                            <label htmlFor="password_confirmation">Confirm New Password:</label>
                            {errors.password_confirmation && <p className="error-message">{errors.password_confirmation[0]}</p>}
                            <input
                                type="password"
                                id="password_confirmation"
                                name="password_confirmation"
                                value={formData.password_confirmation}
                                onChange={handleInputChange}
                                className={errors.password_confirmation ? 'error-input' : ''}
                            />

                            <button className="primary-btn" onClick={() => handleSave('password')}>Save</button>
                        </div>

                        <button className="secondary-btn logout-btn" onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    <button className="primary-btn" onClick={() => window.location.href = '/login'}>Login</button>
                )}
            </div>
        </div>
    );
}

export default Profile;
