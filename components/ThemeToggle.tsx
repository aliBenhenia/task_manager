"use client";

import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle: React.FC = () => {
    const { darkMode, toggleTheme } = useTheme();

    return (
        <button 
            className="theme-toggle" 
            onClick={toggleTheme} 
            aria-label="Toggle dark mode"
        >
            {darkMode ? '☀️' : '🌙'}
        </button>
    );
};

export default ThemeToggle;
