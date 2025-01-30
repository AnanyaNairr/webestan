import React, { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (event) => {
        event.preventDefault(); 
        if (email && password) {
            window.location.href = 'gayathri/index.html'; 
        } else {
            alert('Please enter valid credentials.');
        }
    };

    const togglePasswordVisibility = () => {
        const input = document.getElementById('loginPassword');
        input.type = input.type === 'password' ? 'text' : 'password';
    };

    return (
        <div>
            <form onSubmit={handleLogin}>
                <input 
                    type="email" 
                    id="loginEmail" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Email" 
                    required 
                />
                <input 
                    type="password" 
                    id="loginPassword" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Password" 
                    required 
                />
                <button type="button" onClick={togglePasswordVisibility}>Toggle Password</button>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
