import React, { useEffect, useState } from "react";
import axios from "axios";

interface ReviewDto {
  id: number;
  reviewText: string;
  rating: number;
  username: string;
}

interface ReviewListProps {
  bookId: number;
}

const ReviewList: React.FC<ReviewListProps> = ({ bookId }) => {
  const [reviews, setReviews] = useState<ReviewDto[]>([]);
  const [error, setError] = useState<string | null>(null);

  const currentUser = sessionStorage.getItem("username");

  const fetchReviews = () => {
    axios
      .get(`/api/reviews/${bookId}`)
      .then((response) => setReviews(response.data))
      .catch((error) => {
        console.error("Kunde inte hämta recensioner:", error);
        setError("Kunde inte hämta recensioner");
      });
  };

  useEffect(() => {
    fetchReviews();
  }, [bookId]);

  const handleDelete = async (reviewId: number) => {
    try {
      await axios.delete(`/api/reviews/${reviewId}`);
      fetchReviews();
    } catch (error) {
      console.error("Kunde inte ta bort recensionen:", error);
    }
  };

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (reviews.length === 0) {
    return <p style={{ color: "#777", fontStyle: "italic" }}>Inga recensioner ännu.</p>;
  }

  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <div style={{ marginTop: "1rem", textAlign: "left" }}>
      <p style={{ fontWeight: "bold" }}>
        Snittbetyg: {averageRating.toFixed(1)} / 5
      </p>
      {reviews.map((review) => (
        <div key={review.id} style={{ marginBottom: "0.75rem" }}>
          <p style={{ margin: 0 }}>{review.reviewText}</p>
          <p style={{ margin: 0 }}>Betyg: {review.rating}</p>
          <p style={{ margin: 0, fontStyle: "italic", fontSize: "0.875rem" }}>
            Recension av: {review.username}
          </p>
          {review.username === currentUser && (
            <button
              onClick={() => handleDelete(review.id)}
              style={{
                marginTop: "0.25rem",
                padding: "0.25rem 0.5rem",
                fontSize: "0.75rem",
                backgroundColor: "#ff4d4f",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Ta bort
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
