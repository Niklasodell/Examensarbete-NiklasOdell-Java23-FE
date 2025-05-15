import React from 'react';
import { addBook } from '../services/WishListService';

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    imageLinks?: {
      thumbnail: string;
    };
  };
}

interface SearchResultsProps {
  results: Book[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  const handleAddBook = async (book: Book) => {
    const newBook = {
      title: book.volumeInfo.title,
      author: book.volumeInfo.authors ? book.volumeInfo.authors[0] : 'Unknown',
      imageUrl: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : '',
      status: 'pending',
    };

    try {
      await addBook(newBook);
      alert('Book added to wishlist!');
    } catch (error) {
      console.error('Failed to add book', error);
      alert('Failed to add book to wishlist.');
    }
  };

  return (
    <div className="search-results">
      {results.length > 0 ? (
        results.map((book) => (
          <div key={book.id} className="search-result-card">
            <img
              src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/150'}
              alt={book.volumeInfo.title}
            />
            <h3>{book.volumeInfo.title}</h3>
            <p>{book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author'}</p>
            <button onClick={() => handleAddBook(book)}>Add to Wishlist</button>
          </div>
        ))
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchResults;
