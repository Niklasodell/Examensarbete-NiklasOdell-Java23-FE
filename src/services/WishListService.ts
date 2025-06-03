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

export const getReviews = (bookId: number) => {
  return axios.get(`/api/reviews/${bookId}`);
};

export const getAverageRating = (bookId: number) => {
  return axios.get(`/api/reviews/${bookId}/average`);
};

export const submitReview = (bookId: number, reviewData: { reviewText: string, rating: number }) => {
  return axios.post(`/api/reviews/${bookId}`, reviewData);
};

