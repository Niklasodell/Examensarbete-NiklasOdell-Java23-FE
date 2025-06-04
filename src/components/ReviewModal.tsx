import React, { useEffect, useState } from "react";
import {
  getReviewsByTitle,
  getAverageRatingByTitle,
  submitReviewByTitle,
} from "../services/WishListService";

interface ReviewDto {
  id: number;
  reviewText: string;
  rating: number;
  username: string;
}

interface ReviewModalProps {
  bookTitle: string;
  onClose: () => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ bookTitle, onClose }) => {
  const [reviews, setReviews] = useState<ReviewDto[]>([]);
  const [averageRating, setAverageRating] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState<number>(0);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const [reviewRes, avgRes] = await Promise.all([
        getReviewsByTitle(bookTitle),
        getAverageRatingByTitle(bookTitle),
      ]);
      setReviews(reviewRes.data);
      setAverageRating(avgRes.data);
    } catch (err) {
      console.error("Kunde inte hämta recensioner:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [bookTitle]);

  const handleSubmit = async () => {
    if (!reviewText || rating < 1 || rating > 5) {
      setSubmitError("Vänligen skriv en kommentar och välj ett betyg mellan 1 och 5.");
      return;
    }

    try {
      await submitReviewByTitle(bookTitle, { reviewText, rating });
      setReviewText("");
      setRating(0);
      setSubmitError(null);
      fetchData(); // ladda om recensionerna
    } catch (err) {
      console.error("Kunde inte skicka recension:", err);
      setSubmitError("Det gick inte att skicka recensionen. Du kanske redan har recenserat.");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100%", height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 9999
      }}
    >
      <div
        style={{
          background: "white",
          padding: "2rem",
          borderRadius: "8px",
          maxWidth: "600px",
          width: "90%",
          maxHeight: "90%",
          overflowY: "auto"
        }}
      >
        <h2>{bookTitle}</h2>

        {loading ? (
          <p>Laddar recensioner...</p>
        ) : (
          <>
            <p><strong>Snittbetyg:</strong> {averageRating?.toFixed(1) ?? "N/A"} / 5</p>

            {reviews.length === 0 ? (
              <p style={{ fontStyle: "italic", color: "#666" }}>Inga recensioner ännu.</p>
            ) : (
              reviews.map((r) => (
                <div key={r.id} style={{ borderBottom: "1px solid #ddd", marginBottom: "1rem" }}>
                  <p>{r.reviewText}</p>
                  <p>Betyg: {r.rating}</p>
                  <p style={{ fontSize: "0.875rem", fontStyle: "italic" }}>Recension av: {r.username}</p>
                </div>
              ))
            )}

            <h4>Lämna en recension</h4>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Skriv din recension här..."
              rows={3}
              style={{ width: "100%", marginBottom: "0.5rem" }}
            />
            <input
              type="number"
              min={1}
              max={5}
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              placeholder="Betyg (1-5)"
              style={{ width: "100px", marginBottom: "0.5rem" }}
            />
            <button onClick={handleSubmit} style={{ display: "block", marginTop: "0.5rem" }}>
              Skicka recension
            </button>

            {submitError && <p style={{ color: "red", marginTop: "0.5rem" }}>{submitError}</p>}
          </>
        )}

        <button onClick={onClose} style={{ marginTop: "1rem" }}>
          Stäng
        </button>
      </div>
    </div>
  );
};

export default ReviewModal;
