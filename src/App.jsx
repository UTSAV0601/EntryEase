import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Employees from './pages/Employees';
import Documentation from './pages/Documentation';
import AddEmployee from './pages/AddEmployee';
import Progress from './pages/ProgressTracker';
import { EmployeeProvider } from './context/EmployeeContext';
import Sidebar from './components/Sidebar';
import './styles/global.css';

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <EmployeeProvider>
      <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="app-container">

        <Sidebar isOpen={isSidebarOpen} />
        

        <div className={`page-content ${isSidebarOpen ? 'sidebar-open' : ''}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/add-employee" element={<AddEmployee />} />
            <Route path="/progress" element={<Progress />} />
          </Routes>
        </div>
      </div>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Globallogic. All Rights Reserved.</p>
      </footer>
    </EmployeeProvider>
  );
};

export default App;
