// src/components/Table.tsx
import React from "react";
import { TableProps } from "../../../common/types/dataTypes";


const Table: React.FC<TableProps> = ({ data, numStart }) => {
	return (
		<table className="custom-table">
			<thead>
				<tr>
					<th>#</th>
					<th>Place Name</th>
					<th>Country</th>
				</tr>
			</thead>
			<tbody>
				{data.length > 0 ? (
					data.map((item, index) => (
						<tr key={item.id}>
							<td>{numStart + index + 1}</td>
							<td>{item.city}</td>
							<td>
								{item.country}
								<img
									src={`https://countryflagsapi.com/png/${item.countryCode.toLowerCase()}`}
									alt={item.country}
									className="flag"
								/>
							</td>
						</tr>
					))
				) : (
					<tr>
						<td colSpan={3}>No result found</td>
					</tr>
				)}
			</tbody>
		</table>
	);
};

export default Table;
