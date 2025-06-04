import axios from 'axios';

export const login = async (username: string, password: string): Promise<void> => {

  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }
};

export const register = async (username: string, password: string): Promise<void> => {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Registration failed:", errorText);
    throw new Error("Registration failed");
  }
};

export const deleteAccount = () => {
  return axios.delete('/api/auth/delete', { withCredentials: true });
};