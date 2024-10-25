import React, { useState } from 'react';
import axios from 'axios';
import './register.css';

function Register({ setUser, setShowLogin }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });

    const [errors, setErrors] = useState({});

    // Handle form input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({}); // Clear previous errors

        axios.post('/api/register', formData)
            .then(() => {
                // After successful registration, automatically log the user in
                axios.post('/api/login', {
                    email: formData.email,
                    password: formData.password,
                }, { withCredentials: true })
                    .then(response => {
                        setUser(response.data);
                        window.location.reload();
                    })
                    .catch(() => setErrors({ general: 'Login failed after registration' }));
            })
            .catch(error => {
                if (error.response && error.response.status === 422) {
                    setErrors(error.response.data.errors || {});
                } else {
                    setErrors({ general: 'There was an error with the registration.' });
                }
            });
    };

    return (
        <div>
            {errors.general && <p className="error-message">{errors.general}</p>}
            <form onSubmit={handleSubmit}>
                <div className={`input-group ${errors.name ? 'input-error' : ''}`}>
                    <label>Name:</label>
                    {errors.name && <p className="error-text">{errors.name[0]}</p>}
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className={`input-group ${errors.email ? 'input-error' : ''}`}>
                    <label>Email:</label>
                    {errors.email && <p className="error-text">{errors.email[0]}</p>}
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className={`input-group ${errors.password ? 'input-error' : ''}`}>
                    <label>Password:</label>
                    {errors.password && <p className="error-text">{errors.password[0]}</p>}
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className={`input-group ${errors.password_confirmation ? 'input-error' : ''}`}>
                    <label>Confirm Password:</label>
                    {errors.password_confirmation && <p className="error-text">{errors.password_confirmation[0]}</p>}
                    <input
                        type="password"
                        name="password_confirmation"
                        value={formData.password_confirmation}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button className="primary-btn register-btn" type="submit">Register</button>
            </form>
            <div className="login-link">
                <p>Already have an account?</p>
                <span onClick={() => setShowLogin(true)} className="swap-link">Sign In</span>
            </div>
        </div>
    );
}

export default Register;
