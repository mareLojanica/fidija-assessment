import { useState, useMemo } from "react"

interface UsePaginationProps<T> {
	data: T[]
	itemsPerPage: number
}

export const usePagination = <T>({
	data,
	itemsPerPage,
}: UsePaginationProps<T>) => {
	const [currentPage, setCurrentPage] = useState(0)

	const pageCount = useMemo(
		() => Math.ceil(data.length / itemsPerPage),
		[data, itemsPerPage]
	)

	const paginatedData = useMemo(
		() =>
			data.slice(
				currentPage * itemsPerPage,
				(currentPage + 1) * itemsPerPage
			),
		[data, currentPage, itemsPerPage]
	)

	const goToNextPage = () =>
		setCurrentPage((prev) => Math.min(prev + 1, pageCount - 1))
	const goToPrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 0))
	const goToPage = (page: number) => setCurrentPage(page)

	return {
		paginatedData,
		currentPage,
		pageCount,
		goToNextPage,
		goToPrevPage,
		goToPage,
		setCurrentPage,
	}
}
