import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Employees from './pages/Employees';
import Documentation from './pages/Documentation';
import AddEmployee from './pages/AddEmployee';
import Progress from './pages/ProgressTracker';
import Login from './pages/Login';
import Register from './pages/Register';

import { EmployeeProvider } from './context/EmployeeContext';
import { AuthProvider } from './context/AuthContext';

import './styles/global.css';

const App = () => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
    document.body.classList.toggle('dark-mode', newTheme === 'dark');
  };

  return (
    <AuthProvider>
      <EmployeeProvider>
        <div className={`app-container ${theme}`}>
          {/* Navbar (Top Navigation) */}
          <Navbar toggleTheme={toggleTheme} />

          {/* Sidebar and Main Content */}
          <div className="content">
            <Sidebar />
            <div className="page-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/documentation" element={<Documentation />} />
                <Route path="/add-employee" element={<AddEmployee />} />
                <Route path="/progress" element={<Progress />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </div>
          </div>
        </div>
      </EmployeeProvider>
    </AuthProvider>
  );
};

export default App;
