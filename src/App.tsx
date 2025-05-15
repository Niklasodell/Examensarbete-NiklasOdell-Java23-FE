import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Wishlist from './components/Wishlist';
import SearchBar from './components/SearchBar';

const App: React.FC = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <div>
        <h1>Book Wishlist App</h1>
        <Routes>
          <Route path="/" element={<Navigate to={isAuthenticated ? "/wishlist" : "/login"} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/search" element={<SearchBar />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
