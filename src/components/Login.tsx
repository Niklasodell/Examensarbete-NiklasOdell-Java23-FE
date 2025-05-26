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
      <button onClick={handleLogin} style={{ padding: '0.5rem 1rem', marginBottom: '1rem' }}>
        Login
      </button>

      <hr style={{ margin: '1.5rem 0' }} />

      <div>
        <p style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>
          Om du ej har registrerat dig:
        </p>
        <button
          onClick={() => (window.location.href = '/register')}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#6c63ff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Gå till registrering
        </button>
      </div>
    </div>
  );
};

export default Login;
