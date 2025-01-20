import { TVEpisode, TVShow } from "./mazeTvApi.types"

export interface HomepageState {
	selectedDate: string
	setSelectedDate: (date: string) => void
	data: TVEpisode[]
	isLoading: boolean
	error: Error | null
	pageCount: number
	currentPage: number
	setCurrentPage: (page: number) => void
}
export interface ShowPageState {
	show: TVShow | undefined
	isLoading: boolean
	error: Error | null
}
