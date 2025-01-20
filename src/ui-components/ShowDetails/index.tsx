import React from "react"
import styles from "./ShowDetails.module.scss"
import ShowImage from "../ShowImage"
import StarRating from "../../ui-components/StarRating"
import { ShowDetailsProps } from "../../types/ui-component.types"

const ShowDetails: React.FC<ShowDetailsProps> = ({
	image,
	name,
	rating,
	summary,
}) => {
	return (
		<div className={styles["show-details"]} data-testid="show-details">
			<ShowImage image={image} name={name} />
			<div className={styles["show-details__content"]}>
				<div className={styles["show-details__rating"]}>
					<StarRating rating={rating ?? 0} />
					<span>{rating ? `${rating / 2} / 5` : "N/A"}</span>
				</div>
				<div className={styles["show-details__title__wrapper"]}>
					<h2
						className={styles["show-details__title"]}
						role="heading"
					>
						{name}
					</h2>
					<p
						className={styles["show-details__summary"]}
						dangerouslySetInnerHTML={{
							__html: summary ?? "No summary available.",
						}}
					/>
				</div>
			</div>
		</div>
	)
}

export default ShowDetails
