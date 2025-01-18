export const getStarRating = (rating: number | null) => {
  const maxStars = 5;
  const filledStars = rating ? Math.round(rating / 2) : 0; // Convert 0-10 scale to 0-5
  const stars = Array.from({ length: maxStars }, (_, i) =>
    i < filledStars ? "⭐" : "☆"
  ); // Yellow for filled, Silver for empty
  return stars.join(""); // Convert array to string
};
