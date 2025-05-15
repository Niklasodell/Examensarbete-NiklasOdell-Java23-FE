import React from 'react';

const BookCard = ({ book, onDelete }: any) => {
  return (
    <div className="book-card">
      <h3>{book.title}</h3>
      <p>{book.author}</p>
      <button onClick={() => onDelete(book.id)}>Remove</button>
    </div>
  );
};

export default BookCard;