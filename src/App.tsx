import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import SearchBox from "./components/ui/SearchBox/SearchBox";
import Pagination from "./components/ui/Table/Pagination";
import Table from "./components/ui/Table/Table";
import { CityData, DataItem } from "./common/types/dataTypes";

const App: React.FC = () => {
	const [data, setData] = useState<DataItem[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [query, setQuery] = useState("");
	const [limit, setLimit] = useState(5);

	const fetchData = useCallback(
		async (searchQuery: string, page: number = 1) => {
			const offset = (page - 1) * limit;
			const options = {
				method: "GET",
				url: import.meta.env.VITE_API_URL,
				params: { limit, offset, namePrefix: searchQuery },
				headers: {
					"X-RapidAPI-Key": import.meta.env.VITE_API_KEY,
					"X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
				},
			};

			const response = await axios.request(options);

			const items = response.data.data.map((item: CityData) => ({
				id: item.id,
				city: item.city,
				country: item.country,
				countryCode: item.countryCode,
			}));
			setData(items);
			setTotalPages(Math.ceil(response.data.metadata.totalCount / limit));
		},
		[limit]
	);

	const handleSearch = (searchQuery: string) => {
		setQuery(searchQuery);
		setCurrentPage(1);
		fetchData(searchQuery, 1);
	};

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		fetchData(query, page);
	};

	const handleLimitChange = (newLimit: number) => {
		setLimit(newLimit);
		setCurrentPage(1);
	};

	useEffect(() => {
		fetchData(query, 1);
	}, [query, limit, fetchData]);

	return (
		<div className="app">
			<SearchBox onSearch={handleSearch} />
			{data.length > 0 && (
				<Table numStart={limit * (currentPage - 1)} data={data} />
			)}
			{data.length > 0 && (
				<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={handlePageChange}
					limit={limit}
					onLimitChange={handleLimitChange}
				/>
			)}
		</div>
	);
};

export default App;
