import axios from 'axios';

export const searchBooks = (query: string) => {
  return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`, {
    withCredentials: false,
  });
};