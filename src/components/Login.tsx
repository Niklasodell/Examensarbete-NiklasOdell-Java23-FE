import React, { useState } from 'react';
import { login } from '../services/AuthService';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await login(username, password);
      alert('Login successful!');
      window.location.href = '/wishlist';
    } catch (error) {
      console.error(error);
      alert('Login failed');
    }
  };

  return (
    <div
      style={{
        textAlign: 'center',
        padding: '2rem',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: 'white',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        minWidth: '300px',
      }}
    >
      <h2 style={{ marginBottom: '1rem' }}>Login</h2>
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: '0.5rem', width: '100%' }}
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '0.5rem', width: '100%' }}
        />
      </div>
      <button onClick={handleLogin} style={{ padding: '0.5rem 1rem' }}>
        Login
      </button>
    </div>
  );
};

export default Login;
