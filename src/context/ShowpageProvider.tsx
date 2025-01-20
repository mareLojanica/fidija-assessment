import React, { PropsWithChildren } from "react"
import { ShowPageContext } from "./ShowPageContext"
import { useParams } from "react-router-dom"
import { useShow } from "../hooks/useShow"

export const ShowPageProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const { showId } = useParams<string>()
	const { data: show, isLoading, error } = useShow(showId ?? "")

	return (
		<ShowPageContext.Provider value={{ show, isLoading, error }}>
			{children}
		</ShowPageContext.Provider>
	)
}
