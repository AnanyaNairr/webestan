import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Recipes from './pages/Recipes';
import Community from './pages/Community';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/recipes" element={<Recipes />} />
              <Route path="/community" element={<Community />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Toaster 
          position="bottom-right"
          toastOptions={{
            className: 'bg-white shadow-lg rounded-lg p-4',
            duration: 3000,
            style: {
              background: 'white',
              color: '#374151',
              padding: '16px',
              borderRadius: '12px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            },
          }}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;