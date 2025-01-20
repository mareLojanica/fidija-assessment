import { PropsWithChildren, useMemo, useState } from "react"
import { usePagination } from "../hooks/usePagination"
import { HomepageContext } from "./HomepageContext"
import { EPISODES_PER_PAGE } from "../constants"
import { useSchedule } from "../hooks/useSchedule"

export const HomepageProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [selectedDate, setSelectedDate] = useState<string>(
		() => new Date().toISOString().split("T")[0]
	)

	const { data, isLoading, error } = useSchedule(selectedDate)

	const {
		paginatedData,
		currentPage,
		pageCount,
		goToNextPage,
		goToPrevPage,
		goToPage,
		setCurrentPage,
	} = usePagination({ data: data || [], itemsPerPage: EPISODES_PER_PAGE })

	const contextValue = useMemo(
		() => ({
			selectedDate,
			setSelectedDate,
			data: paginatedData,
			isLoading,
			error,
			pageCount,
			currentPage,
			goToNextPage,
			goToPrevPage,
			goToPage,
			setCurrentPage,
		}),
		[
			selectedDate,
			paginatedData,
			isLoading,
			error,
			pageCount,
			currentPage,
			goToNextPage,
			goToPrevPage,
			goToPage,
			setCurrentPage,
		]
	)

	return (
		<HomepageContext.Provider value={contextValue}>
			{children}
		</HomepageContext.Provider>
	)
}
