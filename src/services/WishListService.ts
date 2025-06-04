import axios from 'axios';
import { WishlistBook } from '../services/Types';

const WISHLIST_URL = '/api/wishlist';

axios.defaults.withCredentials = true;

export const getWishlist = () => {
  return axios.get(WISHLIST_URL);
};

export const addBookToWishlist = (book: Omit<WishlistBook, 'id'>) => {
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

export const getBookByTitle = async (title: string) => {
  return axios.get(`/api/wishlist/by-title?title=${encodeURIComponent(title)}`);
};

export const getReviewsByTitle = (title: string) => {
  return axios.get(`/api/reviews/by-title?title=${encodeURIComponent(title)}`);
};

export const getAverageRatingByTitle = (title: string) => {
  return axios.get(`/api/reviews/by-title/average?title=${encodeURIComponent(title)}`);
};

export const submitReviewByTitle = (title: string, reviewData: { reviewText: string, rating: number }) => {
  return axios.post(`/api/reviews/by-title?title=${encodeURIComponent(title)}`, reviewData);
};
