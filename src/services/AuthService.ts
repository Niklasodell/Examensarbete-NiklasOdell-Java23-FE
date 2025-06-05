import axios from 'axios';

export const login = async (username: string, password: string): Promise<void> => {
  const response = await axios.post('/api/auth/login', { username, password }, { withCredentials: true });

  if (response.status !== 200) {
    throw new Error('Login failed');
  }
};

export const register = async (username: string, password: string): Promise<void> => {
  const response = await axios.post('/api/auth/register', { username, password });

  if (response.status !== 200) {
    throw new Error("Registration failed");
  }
};

export const deleteAccount = async (): Promise<boolean> => {
  try {
    const res = await axios.delete('/api/auth/delete', { withCredentials: true });
    return res.status === 200;
  } catch (err) {
    console.error("Error deleting account:", err);
    return false;
  }
};