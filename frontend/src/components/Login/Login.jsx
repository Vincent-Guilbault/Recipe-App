import axios from 'axios';
import React, { useState } from 'react';
import './login.css';

function Login({ setUser, setShowLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('/api/login', {
            email: email,
            password: password,
        }, { withCredentials: true })
        .then(() => {
            // After login, manually fetch the user data to update the state
            axios.get('/api/user', { withCredentials: true })
              .then(response => {
                setUser(response.data);  // Set the authenticated user
                console.log('Login successful!', response.data);
              })
              .catch(() => {
                setUser(null);  // Handle errors if the user fetch fails
              });
        })
        .catch(error => {
            setError('Invalid credentials');
            console.error('Login error:', error);
        });
    };


    return (
        <>
            <form onSubmit={handleSubmit}>
                {/* <h2>Sign In</h2> */}
                {error && <p>{error}</p>}
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
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
                {/* setShowLogin to switch to Register */}
                <span onClick={() => setShowLogin(false)} className="swap-link">Sign Up</span>
            </div>
        </>
    );
}

export default Login;
