import { useState } from "react";
import { submitReview } from "../services/WishListService";

interface Props {
  bookId: number;
  onSuccess: () => void;
}

const ReviewForm: React.FC<Props> = ({ bookId, onSuccess }) => {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      await submitReview(bookId, { reviewText, rating });
      onSuccess(); // Ladda om reviews
      setReviewText("");
      setRating(0);
    } catch (err: any) {
      console.error(err);
      setError("Du har redan recenserat denna bok.");
    }
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      <h4>Skriv en recension</h4>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <textarea
        rows={3}
        placeholder="Skriv din recension här..."
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        style={{ width: '100%', marginBottom: '0.5rem' }}
      />
      <div>
        <label>Betyg: </label>
        <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
          <option value={0}>Välj</option>
          {[1,2,3,4,5].map(num => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </div>
      <button
        onClick={handleSubmit}
        style={{ marginTop: '0.5rem', padding: '0.4rem 1rem' }}
      >
        Skicka
      </button>
    </div>
  );
};

export default ReviewForm;
