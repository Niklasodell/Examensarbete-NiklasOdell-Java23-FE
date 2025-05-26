import React, { useState } from 'react';
import { searchBooks } from '../services/GoogleBooksService';
import SearchResults from './SearchResults';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const response = await searchBooks(query);
    setResults(response.data.items || []);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '1rem', textAlign: 'center' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Sök efter böcker</h2>

      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '1.5rem' }}>
        <input
          type="text"
          placeholder="Skriv titel eller författare..."
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

      <SearchResults results={results} />
    </div>
  );
};

export default SearchBar;
