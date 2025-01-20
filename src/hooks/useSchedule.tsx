import { useQuery } from "@tanstack/react-query"
import { fetchSchedule } from "../api/api"
import { SCHEDULE_QUERY_KEY } from "../constants"

export const useSchedule = (selectedDate: string) => {
	return useQuery({
		queryKey: [SCHEDULE_QUERY_KEY, selectedDate],
		queryFn: () => fetchSchedule(selectedDate),
	})
}
