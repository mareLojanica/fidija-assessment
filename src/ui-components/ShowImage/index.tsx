import React from "react"
import styles from "./ShowImage.module.scss"
import { ShowImageProps } from "../../types/ui-component.types"

const ShowImage: React.FC<ShowImageProps> = ({ image, name }) => {
	return (
		<div className={styles["show-image"]}>
			{image ? (
				<img
					src={image.medium}
					alt={name}
					className={styles["show-image__img"]}
				/>
			) : (
				<div className={styles["show-image__placeholder"]}>
					No Image
				</div>
			)}
		</div>
	)
}

export default ShowImage
