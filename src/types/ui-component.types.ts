import { ReactNode } from "react"
import { TVCast } from "./mazeTvApi.types"

export interface DatePickerProps {
	selectedDate: string
	onDateChange: (date: string) => void
}

export interface ShowCardProps {
	show: {
		id: number
		name: string
		image?: string
		rating: number
	}
}

export interface PaginationProps {
	pageCount: number
	currentPage: number
	onPageChange: (selected: number) => void
}
export interface ShowInfoSectionProps {
	network?: string
	schedule: string[]
	status: string
	genres: string[]
}
export interface ShowImageProps {
	image: { medium?: string } | null
	name: string
}
export interface ShowCastSectionProps {
	cast: TVCast[]
}
export interface ShowDetailsProps {
	image: { medium?: string } | null
	name: string
	rating?: number
	summary?: string
}
export interface StarRatingProps {
	rating: number
}
export interface ShowSectionProps {
	title: string
	children?: ReactNode
}
export interface CastListItemProps {
	actor: {
		person: {
			id: number
			name: string
			image?: { medium?: string } | null
		}
		character: {
			name: string
		}
	}
}
export interface ResponsiveImageProps {
	alt: string
	src: string
	webpSrc?: string
	avifSrc?: string
	smallSrc?: string
	mediumSrc?: string
	className?: string
	fallbackComponent: ReactNode
}
