export interface DataItem {
	id: number;
	city: string;
	country: string;
	countryCode: string;
}

export interface CityData {
	id: number;
	wikiDataId: string;
	type: string;
	city: string;
	name: string;
	country: string;
	countryCode: string;
	region: string;
	regionCode: string;
	latitude: number;
	longitude: number;
	population: number;
}

export interface TableProps {
	data: {
		id: number;
		city: string;
		country: string;
		countryCode: string;
	}[];
	numStart: number;
}

export interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	limit: number;
	onLimitChange: (limit: number) => void;
}
