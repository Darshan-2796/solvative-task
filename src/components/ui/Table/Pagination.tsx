// src/components/Pagination.tsx
import React from "react";
import { PaginationProps } from "../../../common/types/dataTypes";

const Pagination: React.FC<PaginationProps> = ({
	currentPage,
	totalPages,
	onPageChange,
	limit,
	onLimitChange,
}) => {
	const getPages = () => {
		if (totalPages <= 4) {
			return [...Array(totalPages).keys()].map((i) => i + 1);
		}

		const pages = [];
		if (currentPage <= 2) {
			pages.push(1, 2, 3, 4, "...", totalPages);
		} else if (currentPage > 2 && currentPage < totalPages - 1) {
			pages.push(
				1,
				"...",
				currentPage - 1,
				currentPage,
				currentPage + 1,
				"...",
				totalPages
			);
		} else {
			pages.push(
				1,
				"...",
				totalPages - 3,
				totalPages - 2,
				totalPages - 1,
				totalPages
			);
		}
		return pages;
	};

	const pages = getPages();

	return (
		<div className="pagination">
			<div className="page-buttons">
				{pages.map((page, index) => (
					<button
						key={index}
						className={page === currentPage ? "active" : ""}
						onClick={() => typeof page === "number" && onPageChange(page)}
						disabled={page === "..."}
					>
						{page}
					</button>
				))}
			</div>
			<div className="limit-selector">
				<label htmlFor="limit">Items per page:</label>
				<select
					id="limit"
					value={limit}
					onChange={(e) => onLimitChange(parseInt(e.target.value, 10))}
				>
					<option value={5}>5</option>
					<option value={6}>6</option>
					<option value={7}>7</option>
					<option value={8}>8</option>
					<option value={9}>9</option>
					<option value={10}>10</option>
				</select>
			</div>
		</div>
	);
};

export default Pagination;
