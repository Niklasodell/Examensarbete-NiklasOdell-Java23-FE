import { useEffect, useState } from "react";
import { getReviews, getAverageRating } from "../services/WishListService";

interface Review {
  id: number;
  reviewText: string;
  rating: number;
  user: {
    username: string;
  };
}

interface Props {
  bookId: number;
}

const ReviewList: React.FC<Props> = ({ bookId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [average, setAverage] = useState<number>(0);

  useEffect(() => {
    getReviews(bookId).then(res => setReviews(res.data));
    getAverageRating(bookId).then(res => setAverage(res.data));
  }, [bookId]);

  return (
    <div style={{ marginTop: "1rem" }}>
      <p><strong>Snittbetyg:</strong> {average.toFixed(1)} / 5 ⭐</p>
      <h4>Recensioner:</h4>
      {reviews.length === 0 && <p>Inga recensioner ännu.</p>}
      <ul style={{ paddingLeft: 0 }}>
        {reviews.map(r => (
          <li key={r.id} style={{ listStyle: 'none', marginBottom: '0.5rem' }}>
            <strong>{r.user.username}</strong> ({r.rating}/5): {r.reviewText}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewList;
