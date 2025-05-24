import axios from 'axios';
import { getToken } from './AuthService';

const WISHLIST_URL = 'api/wishlist';

const getAuthHeaders = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getWishlist = () => {
  return axios.get(WISHLIST_URL, {
    headers: getAuthHeaders()
  });
};

export const addBook = (book: any) => {
  return axios.post(WISHLIST_URL, book, {
    headers: getAuthHeaders()
  });
};

export const updateBook = (id: number, book: any) => {
  return axios.put(`${WISHLIST_URL}/${id}`, book, {
    headers: getAuthHeaders()
  });
};

export const deleteBook = (id: number) => {
  return axios.delete(`${WISHLIST_URL}/${id}`, {
    headers: getAuthHeaders()
  });
};
