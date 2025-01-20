import { createContext } from "react"
import { ShowPageState } from "../types/poviders.types"

const defaultState: ShowPageState = {
	show: undefined,
	isLoading: false,
	error: null,
}

export const ShowPageContext = createContext<ShowPageState>(defaultState)
