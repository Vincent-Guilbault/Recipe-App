import axios from 'axios';
import React, { useState } from 'react';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('/api/login', {
            email: email,
            password: password,
        })
        .then(response => {
            // Save the token or set authentication state
            console.log('Login successful!', response.data);
        })
        .catch(error => {
            setError('Invalid credentials');
            console.error('Login error:', error);
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            {error && <p>{error}</p>}
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Login</button>
        </form>
    );
}

export default Login;
