import React, { useState } from 'react';
import { searchBooks } from '../services/GoogleBooksService';
import SearchResults from './SearchResults';
import { GoogleBook } from '../services/Types';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState<GoogleBook[]>([]);

  const handleSearch = async () => {
    const response = await searchBooks(query);
    const items = response.data.items || [];

    const formattedBooks: GoogleBook[] = items.map((item: any) => ({
      id: item.id,
      title: item.volumeInfo.title || 'Okänd titel',
      author: item.volumeInfo.authors?.[0] || 'Okänd författare',
      imageUrl: item.volumeInfo.imageLinks?.thumbnail || '',
    }));

    setBooks(formattedBooks);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '1rem', textAlign: 'center' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Sök efter böcker</h2>

      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '1.5rem' }}>
        <input
          type="text"
          placeholder="Skriv titel eller författare..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            padding: '0.5rem',
            width: '300px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Sök
        </button>
      </div>

      <SearchResults books={books} />
    </div>
  );
};

export default SearchBar;
