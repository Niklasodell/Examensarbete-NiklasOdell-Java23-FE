import { useState } from "react";
import ReviewModal from "./ReviewModal";
import { GoogleBook } from '../services/Types';
import { addBookToWishlist } from '../services/WishListService';

interface SearchResultsProps {
  books: GoogleBook[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ books }) => {
  const [selectedBookTitle, setSelectedBookTitle] = useState<string | null>(null);

  const handleAddToWishlist = async (book: GoogleBook) => {
    try {
      await addBookToWishlist({
        title: book.title,
        author: book.author,
        imageUrl: book.imageUrl,
        status: "pending"
      });
      alert("Boken har lagts till i din önskelista!");
    } catch (err) {
      console.error("Kunde inte lägga till bok:", err);
      alert("Det gick inte att lägga till boken.");
    }
  };

  const handleShowReviews = (title: string) => {
    setSelectedBookTitle(title);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "2rem auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Sökresultat</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "1rem",
        }}
      >
        {books.map((book) => (
          <div
            key={book.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "1rem",
              backgroundColor: "white",
              textAlign: "center",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            }}
          >
            {book.imageUrl && (
              <img
                src={book.imageUrl}
                alt={book.title}
                style={{
                  width: "80px",
                  height: "auto",
                  objectFit: "cover",
                  marginBottom: "0.5rem",
                }}
              />
            )}
            <h3 style={{ fontSize: "1rem", fontWeight: "500" }}>{book.title}</h3>
            <p style={{ fontSize: "0.875rem", color: "#555" }}>{book.author}</p>

            <button
              onClick={() => handleAddToWishlist(book)}
              style={{
                marginTop: "0.5rem",
                marginBottom: "0.5rem",
                padding: "0.4rem 1rem",
                fontSize: "0.875rem",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Lägg till i önskelista
            </button>

            <button
              onClick={() => handleShowReviews(book.title)}
              style={{
                padding: "0.4rem 1rem",
                fontSize: "0.875rem",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Visa recensioner
            </button>
          </div>
        ))}
      </div>

      {selectedBookTitle && (
        <ReviewModal
          bookTitle={selectedBookTitle}
          onClose={() => setSelectedBookTitle(null)}
        />
      )}
    </div>
  );
};

export default SearchResults;