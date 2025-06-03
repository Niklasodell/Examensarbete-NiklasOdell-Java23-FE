import React from 'react';
import { addBook } from '../services/WishListService';

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    imageLinks?: {
      thumbnail?: string;
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
      imageUrl: book.volumeInfo.imageLinks?.thumbnail || '',
      status: 'pending',
      review: '',
      rating: null
    };

    try {
      await addBook(newBook);
      alert('Book added to wishlist!');
    } catch (error) {
      console.error('Failed to add book', error);
      alert('Failed to add book to wishlist.');
    }
  };

  if (results.length === 0) {
    return <p style={{ textAlign: 'center', color: '#555' }}>Inga resultat hittades.</p>;
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '1rem',
      }}
    >
      {results.map((book) => (
        <div
          key={book.id}
          style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '1rem',
            backgroundColor: 'white',
            textAlign: 'center',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
          }}
        >
          <img
            src={
              book.volumeInfo.imageLinks?.thumbnail?.startsWith('http')
                ? book.volumeInfo.imageLinks.thumbnail
                : 'https://dummyimage.com/150x200/cccccc/000000&text=No+Image'
            }
            alt={book.volumeInfo.title}
            loading="lazy"
            style={{ width: '100px', height: 'auto', marginBottom: '0.5rem' }}
          />
          <h3 style={{ fontSize: '1rem', fontWeight: 500 }}>{book.volumeInfo.title}</h3>
          <p style={{ fontSize: '0.875rem', color: '#555' }}>
            {book.volumeInfo.authors?.join(', ') || 'Unknown Author'}
          </p>
          <button
            onClick={() => handleAddBook(book)}
            style={{
              marginTop: '0.5rem',
              padding: '0.5rem 1rem',
              fontSize: '0.875rem',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Lägg till i önskelistan
          </button>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
