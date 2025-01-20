import React from "react"
import styles from "./ShowCastSection.module.scss"
import Pagination from "../../ui-components/Pagination"
import { ShowCastSectionProps } from "../../types/ui-component.types"
import ShowSection from "../ShowSection"
import { usePagination } from "../../hooks/usePagination"
import CastListItem from "../CastListItem"
import { ACTORS_PER_PAGE } from "../../constants"

const ShowCastSection: React.FC<ShowCastSectionProps> = ({ cast }) => {
	const { paginatedData, currentPage, pageCount, goToPage } = usePagination({
		data: cast,
		itemsPerPage: ACTORS_PER_PAGE,
	})

	return (
		<ShowSection title="Starring">
			<section
				data-testid="show-cast-section"
				aria-labelledby="cast-title"
			>
				{paginatedData.length > 0 ? (
					<ul className={styles["cast-list"]}>
						{paginatedData.map((actor) => (
							<CastListItem key={actor.person.id} actor={actor} />
						))}
					</ul>
				) : (
					<p className={styles["cast-list__empty"]} role="alert">
						No cast information available.
					</p>
				)}
				{pageCount > 1 && (
					<Pagination
						pageCount={pageCount}
						currentPage={currentPage}
						onPageChange={goToPage}
					/>
				)}
			</section>
		</ShowSection>
	)
}

export default ShowCastSection
