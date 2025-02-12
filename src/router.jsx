import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Employees from './pages/Employees';
import Documentation from './pages/Documentation';
import AddEmployee from './pages/AddEmployee';
import Progress from './pages/ProgressTracker';
import NotFound from './pages/NotFound';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/employees" element={<Employees />} />
      <Route path="/documentation" element={<Documentation />} />
      <Route path="/add-employee" element={<AddEmployee />} />
      <Route path="/progress" element={<Progress />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;

