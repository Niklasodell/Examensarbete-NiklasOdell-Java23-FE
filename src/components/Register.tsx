import React, { useState } from 'react';
import { register } from '../services/AuthService';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await register(username, password);
      alert('Registration successful! You can now log in.');
      window.location.href = '/login';
    } catch (error) {
      console.error(error);
      alert('Registration failed');
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
      <h2 style={{ marginBottom: '1rem' }}>Register</h2>
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
      <button onClick={handleRegister} style={{ padding: '0.5rem 1rem' }}>
        Register
      </button>
    </div>
  );
};

export default Register;
