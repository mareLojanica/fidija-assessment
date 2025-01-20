import axios from "axios"
export const BASE_URL = "https://api.tvmaze.com/"

export const mazeTvApi = axios.create({
	baseURL: BASE_URL,
})
