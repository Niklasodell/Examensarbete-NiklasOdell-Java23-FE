import axios from 'axios';

const GOOGLE_BOOKS_API = 'https://www.googleapis.com/books/v1/volumes';

export const searchBooks = (query: string) => {
  return axios.get(`${GOOGLE_BOOKS_API}?q=${query}`);
};