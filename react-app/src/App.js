import React from 'react';
import './style.css'; // Importing the CSS file
import Index from './components/Index';
import Login from './components/Login';
import Signup from './components/Signup';

const App = () => {
    return (
        <div>
            <Index />
            <Login />
            <Signup />
        </div>
    );
};

export default App;
