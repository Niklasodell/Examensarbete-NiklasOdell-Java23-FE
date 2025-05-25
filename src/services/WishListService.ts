import axios from 'axios';

const WISHLIST_URL = '/api/wishlist';

axios.defaults.withCredentials = true;

export const getWishlist = () => {
  return axios.get(WISHLIST_URL);
};

export const addBook = (book: any) => {
  return axios.post(WISHLIST_URL, book);
};

export const updateBook = (id: number, book: any) => {
  return axios.put(`${WISHLIST_URL}/${id}`, book);
};

export const deleteBook = (id: number) => {
  return axios.delete(`${WISHLIST_URL}/${id}`);
};
