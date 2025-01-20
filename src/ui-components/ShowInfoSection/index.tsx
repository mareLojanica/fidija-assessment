import React, { useMemo } from "react"
import styles from "./ShowInfoSection.module.scss"
import { ShowInfoSectionProps } from "../../types/ui-component.types"
import ShowSection from "../ShowSection"

const ShowInfoSection: React.FC<ShowInfoSectionProps> = ({
	network,
	schedule,
	status,
	genres,
}) => {
	const infoData = useMemo(
		() => [
			{ label: "Streamed on", value: network ?? "Unknown" },
			{
				label: "Schedule",
				value: schedule.length ? schedule.join(", ") : "Not Available",
			},
			{ label: "Status", value: status },
			{
				label: "Genres",
				value: genres.length ? genres.join(", ") : "N/A",
			},
		],
		[network, schedule, status, genres]
	)

	return (
		<ShowSection title="Show Info">
			<ol className={styles.content} data-testid="show-info-section">
				{infoData.map(({ label, value }) => (
					<li key={label} className={styles.content__item}>
						<strong className={styles.content__label}>
							{label}:
						</strong>
						<span className={styles.content__value}>{value}</span>
					</li>
				))}
			</ol>
		</ShowSection>
	)
}

export default ShowInfoSection
