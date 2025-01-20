import { TVEpisode, TVShow } from "../types/mazeTvApi.types"
import { mazeTvApi } from "./axiosInstance"

export const fetchShow = async (showId: string): Promise<TVShow> => {
	const { data } = await mazeTvApi.get(`/shows/${showId}?embed=cast`)
	return data
}
export const fetchSchedule = async (
	selectedDate: string
): Promise<TVEpisode[]> => {
	const { data } = await mazeTvApi.get(`schedule?date=${selectedDate}`)
	return data
}
