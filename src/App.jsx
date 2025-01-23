import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Employees from './pages/Employees';
import FAQs from './pages/FAQs';
import Documentation from './pages/Documentation';
import ContactUs from './pages/ContactUs';
import NotFound from './pages/NotFound';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/employees" element={<Employees />} />
      <Route path="/faqs" element={<FAQs />} />
      <Route path="/documentation" element={<Documentation />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    <Footer />
  </Router>
);

export default App;

