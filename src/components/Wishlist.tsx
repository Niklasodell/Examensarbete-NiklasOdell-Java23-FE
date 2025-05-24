import React, { useEffect, useState } from 'react';

const Wishlist = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to view this page.');
      window.location.href = '/login';
      return;
    }

    fetch('http://localhost:8080/api/wishlist', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
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