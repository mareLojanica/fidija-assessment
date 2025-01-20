import { useQuery } from "@tanstack/react-query"
import { fetchShow } from "../api/api"
import { SHOW_QUERY_KEY } from "../constants"

export const useShow = (showId: string) => {
	return useQuery({
		queryKey: [SHOW_QUERY_KEY, showId],
		queryFn: () => fetchShow(showId),
	})
}
