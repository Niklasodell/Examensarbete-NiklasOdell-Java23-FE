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

  const fetchBooks = () => {
    getWishlist()
      .then((response) => setBooks(response.data))
      .catch((err) => {
        console.error("Error fetching wishlist:", err);
        setError("Kunde inte hämta önskelistan");
      });
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteBook(id);
      setBooks(books.filter((book) => book.id !== id));
    } catch (error) {
      console.error("Failed to delete book:", error);
      alert("Kunde inte ta bort boken.");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Min önskelista</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul className="space-y-4">
        {books.map((book) => (
          <li key={book.id} className="flex items-center justify-between bg-gray-100 p-4 rounded shadow">
            <div>
              <h3 className="font-bold">{book.title}</h3>
              <p className="text-sm text-gray-600">{book.author}</p>
            </div>
            <button
              onClick={() => handleDelete(book.id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Ta bort
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Wishlist;
