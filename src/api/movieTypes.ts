export type Movie = {
	ageRating: AgeRating;
	backdropUrl: string;
	formats: Format[];
	fromPrice: number;
	genres: Genre[];
	id: number;
	isComingSoon: boolean;
	isFeatured: boolean;
	isNotified: boolean;
	kind: string;
	posterUrl: string;
	releaseDate: string;
	runtimeMinutes: number;
	slug: string;
	title: string;
	synopsis?: string;
};

export type FilterData = {
	venues: Venue[];
	formats: Format[];
	languages: Language[];
	timeBands: TimeBand[];
	sorts: Sort[];
	ticketTypes: TicketType[];
	ageRatings: AgeRating[];
	maxSeatsPerOrder: number;
	holdMinutes: number;
};

type AgeRating = {
	code: string;
	minAge: number;
	description: string;
};

type Genre = {
	id: number;
	slug: string;
	name: string;
};

export type Format = {
	id: number;
	slug: string;
	name: string;
	priceUplift: number;
};

export type Language = {
	id: number;
	slug: string;
	name: string;
	code: string;
};

export type TimeBand = {
	id: string;
	label: string;
};

type Sort = {
	id: string;
	label: string;
};

type TicketType = {
	id: number;
	slug: string;
	name: string;
	priceRatio: number;
	note?: string;
	blockedFromRatingAge?: number;
};

export type Venue = {
	id: number;
	slug: string;
	name: string;
	city: string;
	formats: Format[];
};
