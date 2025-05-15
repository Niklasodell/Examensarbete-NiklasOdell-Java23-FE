import React, { useState } from 'react';
import { searchBooks } from '../services/GoogleBooksService';
import SearchResults from './SearchResults';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const response = await searchBooks(query);
    setResults(response.data.items);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for books..."
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <SearchResults results={results} />
    </div>
  );
};

export default SearchBar;