import { useEffect, useState } from "react";
import { getWishlist, deleteBook } from "../services/WishListService";
import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";

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
    getWishlist()
      .then((response) => {
        const data = response.data;
        if (Array.isArray(data)) {
          setBooks(data);
        } else {
          console.error("Förväntade en lista av böcker, men fick:", data);
          setError("Felaktigt format på data från servern");
          setBooks([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching wishlist:", error);
        setError("Kunde inte hämta önskelistan");
      });
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteBook(id);
      setBooks((prev) => prev.filter((book) => book.id !== id));
    } catch (err) {
      console.error("Kunde inte ta bort boken:", err);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '1rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '1rem' }}>
        Min önskelista
      </h2>

      {error && (
        <p style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>
          {error}
        </p>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '1rem',
        }}
      >
        {Array.isArray(books) && books.map((book) => (
          <div
            key={book.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '1rem',
              backgroundColor: 'white',
              textAlign: 'center',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
            }}
          >
            {book.imageUrl && (
              <img
                src={book.imageUrl}
                alt={book.title}
                style={{
                  width: '80px',
                  height: 'auto',
                  objectFit: 'cover',
                  marginBottom: '0.5rem',
                }}
              />
            )}
            <h3 style={{ fontSize: '1rem', fontWeight: '500' }}>{book.title}</h3>
            <p style={{ fontSize: '0.875rem', color: '#555' }}>{book.author}</p>
            <p style={{ fontSize: '0.875rem', color: '#555' }}>Status: {book.status}</p>

            {/* Recensioner + Snittbetyg */}
            <ReviewList bookId={book.id} />

            {/* Formulär för ny recension */}
            <ReviewForm
              bookId={book.id}
              onSuccess={() => {
              }}
            />

            <button
              onClick={() => handleDelete(book.id)}
              style={{
                marginTop: '0.5rem',
                padding: '0.5rem 1rem',
                fontSize: '0.875rem',
                backgroundColor: '#ff4d4f',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Ta bort
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
