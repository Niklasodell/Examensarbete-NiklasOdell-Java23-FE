import { useEffect, useState } from "react";
import { getWishlist, deleteBook } from "../services/WishListService";

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
      .then((response) => setBooks(response.data))
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
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Min önskelista</h2>
      {error && <p className="text-red-600 text-center mb-4">{error}</p>}
      <div className="grid sm:grid-cols-2 gap-4">
        {books.map((book) => (
          <div
            key={book.id}
            className="border rounded p-3 flex flex-col items-center text-center bg-white shadow-sm"
          >
            {book.imageUrl && (
              <img
                src={book.imageUrl}
                alt={book.title}
                className="w-24 h-auto mb-2 object-cover"
              />
            )}
            <h3 className="text-lg font-medium">{book.title}</h3>
            <p className="text-sm text-gray-600">{book.author}</p>
            <button
              onClick={() => handleDelete(book.id)}
              className="mt-2 px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
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
