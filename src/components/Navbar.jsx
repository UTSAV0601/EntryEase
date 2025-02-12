import React from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi'; // Import icons
import '../styles/Navbar.css';

const Navbar = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <nav className="navbar">
      {/* Burger Icon - Toggles Sidebar */}
      <button className="burger-menu" onClick={toggleSidebar}>
        {isSidebarOpen ? <FiX size={30} /> : <FiMenu size={30} />}
      </button>

      {/* Navigation Links */}
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/employees">Employees</Link>
        <Link to="/documentation">Documentation</Link>
        <Link to="/add-employee">Add Employee</Link>
        <Link to="/progress">Progress</Link>
      </div>
    </nav>
  );
};

export default Navbar;


