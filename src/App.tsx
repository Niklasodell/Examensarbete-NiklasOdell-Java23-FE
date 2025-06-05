import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Wishlist from './components/Wishlist';
import SearchBar from './components/SearchBar';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider, useAuth } from './context/AuthContext';

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const hideHeader = location.pathname === "/login" || location.pathname === "/register";
  const isCenteredPage = hideHeader;

  return (
    <>
      {!hideHeader && <Header />}

      <div
        style={{
          display: isCenteredPage ? 'flex' : 'block',
          justifyContent: isCenteredPage ? 'center' : undefined,
          alignItems: isCenteredPage ? 'center' : undefined,
          height: isCenteredPage ? '100vh' : 'auto',
        }}
      >
        <Routes>
          <Route path="/" element={<Navigate to={isAuthenticated ? "/wishlist" : "/login"} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/wishlist"
            element={
              <PrivateRoute>
                <Wishlist />
              </PrivateRoute>
            }
          />
          <Route
            path="/search"
            element={
              <PrivateRoute>
                <SearchBar />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
};

export default App;
