import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Demo from './pages/Demo';
import './index.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/demo/:productId" element={<Demo />} />
      </Routes>
    </BrowserRouter>
  );
}
