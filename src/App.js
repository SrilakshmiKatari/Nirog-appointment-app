import React from 'react';
import './App.css'; // 👈 this line imports the global CSS

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DoctorDetail from './pages/DoctorDetail';
import BookAppointment from './pages/BookAppointment';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctor/:id" element={<DoctorDetail />} />
        <Route path="/book/:doctorId" element={<BookAppointment />} />
      </Routes>
    </Router>
  );
}

export default App;
