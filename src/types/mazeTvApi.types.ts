export interface TVEpisode {
	id: number
	url: string
	name: string
	season: number
	number: number
	type: string
	airdate: string
	airtime: string
	airstamp: string
	runtime: number
	rating: { average: number | null }
	image: { medium: string; original: string } | null
	summary: string | null
	show: TVShow
	_links: {
		self: { href: string }
		show: { href: string; name: string }
	}
}

export interface TVShow {
	id: number
	url: string
	name: string
	type: string
	language: string
	genres: string[]
	status: string
	runtime: number
	averageRuntime: number
	premiered: string
	ended: string | null
	officialSite: string | null
	schedule: {
		time: string
		days: string[]
	}
	rating: { average: number | null }
	weight: number
	network: TVNetwork | null
	webChannel: string | null
	dvdCountry: string | null
	externals: {
		tvrage: number | null
		thetvdb: number | null
		imdb: string | null
	}
	image: { medium: string; original: string } | null
	summary: string
	updated: number
	_links: {
		self: { href: string }
		previousepisode?: { href: string; name: string }
		nextepisode?: { href: string; name: string }
	}
	_embedded?: TVEmbedded
}

export interface TVNetwork {
	id: number
	name: string
	country: {
		name: string
		code: string
		timezone: string
	}
	officialSite: string | null
}

export interface TVSchedule {
	time: string
	days: string[]
}

export interface TVRating {
	average: number | null
}

export interface TVNetwork {
	id: number
	name: string
	country: TVCountry
	officialSite: string | null
}

export interface TVCountry {
	name: string
	code: string
	timezone: string
}

export interface TVWebChannel {
	id: number
	name: string
}

export interface TVExternals {
	tvrage: number | null
	thetvdb: number | null
	imdb: string | null
}

export interface TVImage {
	medium: string
	original: string
}

export interface TVLinks {
	self: TVHref
	previousepisode?: TVHref
	nextepisode?: TVHref
}

export interface TVHref {
	href: string
	name?: string
}

export interface TVEmbedded {
	cast: TVCast[]
}

export interface TVCast {
	person: TVPerson
	character: TVCharacter
	self: boolean
	voice: boolean
}

export interface TVPerson {
	id: number
	url: string
	name: string
	country: TVCountry | null
	birthday: string | null
	deathday: string | null
	gender: string
	image: TVImage | null
	updated: number
	_links: {
		self: TVHref
	}
}

export interface TVCharacter {
	id: number
	url: string
	name: string
	image: TVImage | null
	_links: {
		self: TVHref
	}
}
