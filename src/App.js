import React from 'react';
import useAuthStore from './store/authStore';
import { useTheme } from './context/ThemeContext';
import ComponentShowcase from './templates/ComponentShowcase';
import './App.css';

function App() {
  const { theme } = useTheme();

  return (
    <div className={`App ${theme}`}>
      <ComponentShowcase />
    </div>
  );
}

export default App;
