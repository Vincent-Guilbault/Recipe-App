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

    const [error, setError] = useState('');

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

        axios.post('/api/register', formData)
            .then(() => {
                // After successful registration, automatically log the user in
                axios.post('/api/login', {
                    email: formData.email,
                    password: formData.password,
                }, { withCredentials: true })
                .then(response => {
                    setUser(response.data);  // Set user state after login
                    console.log('Registration and login successful!', response.data);
                    window.location.reload(); // Refresh the page
                })
                .catch(loginError => {
                    setError('Login failed after registration');
                    console.error('Login error:', loginError);
                });
            })
            .catch(error => {
                setError('There was an error with the registration.');
                console.error('Registration error:', error);
            });
    };

    return (
        <div>
            {/* <h2>Register</h2> */}
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        name="password_confirmation"
                        value={formData.password_confirmation}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button className="register-btn" type="submit">Register</button>
            </form>
            <div className="login-link">
                <p>Already have an account?</p>
                {/* setShowLogin to switch back to Login */}
                <span onClick={() => setShowLogin(true)} className="swap-link">Sign In</span>
            </div>
        </div>
    );
}

export default Register;
