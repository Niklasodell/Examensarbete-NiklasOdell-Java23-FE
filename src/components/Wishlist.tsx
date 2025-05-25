import React, { useEffect, useState } from 'react';

const Wishlist = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/wishlist')
      .then((res) => res.json())
      .then(setBooks)
      .catch((err) => {
        console.error(err);
        alert('Failed to fetch wishlist');
      });
  }, []);

  return (
    <div>
      <h2>My Wishlist</h2>
      <ul>
        {books.map((book: any) => (
          <li key={book.id}>{book.title} by {book.author}</li>
        ))}
      </ul>
    </div>
  );
};

export default Wishlist;
