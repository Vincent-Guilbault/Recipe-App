import axios from 'axios';
import React, { useState } from 'react';
import './login.css';

function Login({ setUser, setShowLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ email: '', password: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({}); // Clear any previous errors

        axios.post('/api/login', { email, password }, { withCredentials: true })
            .then(() => {
                // Fetch user data after login success
                axios.get('/api/user', { withCredentials: true })
                    .then(response => {
                        setUser(response.data);
                    })
                    .catch(() => {
                        setUser(null);
                    });
            })
            .catch(error => {
                // Check if error response has field-specific messages
                if (error.response && error.response.status === 422) {
                    const responseErrors = error.response.data.errors || {};
                    setErrors({
                        email: responseErrors.email ? responseErrors.email[0] : '',
                        password: responseErrors.password ? responseErrors.password[0] : 'Invalid password'
                    });
                } else {
                    setErrors({ password: 'Invalid credentials' });
                }
            });
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                {errors.password && !errors.email && <p className="error-message">{errors.password}</p>}
                <div className={`input-group ${errors.email ? 'input-error' : ''}`}>
                    <label>Email</label>
                    {errors.email && <p className="error-text">{errors.email}</p>}
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className={`input-group ${errors.password ? 'input-error' : ''}`}>
                    <label>Password</label>
                    {errors.password && <p className="error-text">{errors.password}</p>}
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button className="primary-btn login-btn" type="submit">Sign In</button>
            </form>
            <div className="register-link">
                <p>Don't have an account?</p>
                <span onClick={() => setShowLogin(false)} className="swap-link">Sign Up</span>
            </div>
        </>
    );
}

export default Login;
