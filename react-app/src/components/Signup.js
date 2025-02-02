import React, { useState } from 'react';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = (event) => {
        event.preventDefault(); 
        // Handle signup logic here
        alert('Signup successful!'); // Placeholder for actual signup logic
    };

    return (
        <div>
            <form onSubmit={handleSignup}>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Email" 
                    required 
                />
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Password" 
                    required 
                />
                <button type="submit">Signup</button>
            </form>
        </div>
    );
};

export default Signup;
