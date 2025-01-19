import styles from "./StarRating.module.scss";
import { StarRatingProps } from "../../types/ui-component.types";

const StarRating: React.FC<StarRatingProps> = ({ rating }): JSX.Element => {
  const maxStars = 5;
  const filledStars = rating ? Math.round(rating / 2) : 0;
  return (
    <div className={styles["star-rating"]}>
      {Array.from({ length: maxStars }, (_, i) => (
        <svg
          key={i}
          className={
            i < filledStars ? styles["star-filled"] : styles["star-empty"]
          }
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill={i < filledStars ? "#FFD700" : "#D3D3D3"}
        >
          <path d="M12 .587l3.668 7.425 8.21 1.194-5.94 5.79 1.4 8.178L12 18.896l-7.338 3.878 1.4-8.178-5.94-5.79 8.21-1.194z" />
        </svg>
      ))}
    </div>
  );
};

export default StarRating;
