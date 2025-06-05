import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async () => {
    try {
      await login(username, password);
      navigate('/wishlist');
    } catch (error) {
      console.error(error);
      setErrorMsg('Inloggning misslyckades. Kontrollera användarnamn eller lösenord.');
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
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: '0.5rem', width: '100%' }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '0.5rem', width: '100%' }}
        />
      </div>

      <button onClick={handleLogin} style={{ padding: '0.5rem 1rem', marginBottom: '1rem' }}>
        Login
      </button>

      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}

      <hr style={{ margin: '1.5rem 0' }} />

      <div>
        <p style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>
          Om du ej har registrerat dig:
        </p>
        <button
          onClick={() => navigate('/register')}
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
