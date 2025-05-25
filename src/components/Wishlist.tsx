import { useEffect, useState } from "react";

interface Book {
  id: number;
  title: string;
  author: string;
  imageUrl: string;
  status: string;
}

const Wishlist = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/wishlist", {
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setBooks(data))
      .catch((error) => {
        console.error("Error fetching wishlist:", error);
        setError("Kunde inte hämta önskelistan");
      });
  }, []);

  return (
    <div>
      <h2>Min önskelista</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {books.map((book) => (
          <li key={book.id}>{book.title} av {book.author}</li>
        ))}
      </ul>
    </div>
  );
};

export default Wishlist;
