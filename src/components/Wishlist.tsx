import React, { useEffect, useState } from 'react';
import { getWishlist, deleteBook } from '../services/WishListService';
import BookCard from './BookCard';

const Wishlist = () => {
  const [books, setBooks] = useState([]);

  const fetchWishlist = async () => {
    const response = await getWishlist();
    setBooks(response.data);
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleDelete = async (id: number) => {
    await deleteBook(id);
    fetchWishlist();
  };

  return (
    <div>
      <h2>My Wishlist</h2>
      {books.map((book: any) => (
        <BookCard key={book.id} book={book} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default Wishlist;