import { Link } from "react-router-dom"
import styles from "./ShowCard.module.scss"
import StarRating from "../StarRating"
import { ShowCardProps } from "../../types/ui-component.types"
import ResponsiveImage from "../ResponsiveImage"

const ShowCard: React.FC<ShowCardProps> = ({ show }) => {
	return (
		<article className={styles["show-card"]} data-testid="show-card">
			<Link to={`/show/${show.id}`} className={styles["show-card__link"]}>
				<div className={styles["show-card-content__wrapper"]}>
					<div className={styles["show-card__image"]}>
						<ResponsiveImage
							alt={show.name}
							src={show.image || ""}
							className={styles["show-card__img"]}
							fallbackComponent={
								<div
									className={styles["show-card__no-image"]}
									data-testid="fallback-image"
								>
									No Image Available
								</div>
							}
						/>
					</div>
					<div className={styles["show-card__rating"]}>
						<StarRating rating={show.rating} />
					</div>
					<p className={styles["show-card__title"]} title={show.name}>
						{show.name}
					</p>
				</div>
			</Link>
		</article>
	)
}

export default ShowCard
