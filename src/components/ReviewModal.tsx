import React, { useEffect, useState } from "react";
import { getReviews, getAverageRating } from "../services/WishListService";

interface ReviewDto {
  id: number;
  reviewText: string;
  rating: number;
  username: string;
}

interface ReviewModalProps {
  bookId: number;
  title: string;
  onClose: () => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ bookId, title, onClose }) => {
  const [reviews, setReviews] = useState<ReviewDto[]>([]);
  const [averageRating, setAverageRating] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reviewRes, avgRes] = await Promise.all([
          getReviews(bookId),
          getAverageRating(bookId),
        ]);

        setReviews(reviewRes.data);
        setAverageRating(avgRes.data);
      } catch (err) {
        console.error("Kunde inte hämta recensioner:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [bookId]);

  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0,
      width: "100%", height: "100%",
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <div style={{
        background: "white",
        padding: "2rem",
        borderRadius: "8px",
        maxWidth: "600px",
        width: "90%",
        maxHeight: "80%",
        overflowY: "auto"
      }}>
        <h2>{title}</h2>
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
