import React from "react";

export const handleQuery = (query, data) => {
	const filteredData = query
		? data.filter((truck) =>
				truck.name.toLowerCase().includes(query.toLowerCase())
		  )
		: data;
	return filteredData;
};

function Search({ onChange, queryValue, id, onSearchSelect }) {
	return (
		<div className="flex-child">
			<input
				className="form-control mr-sm-2"
				type="search"
				placeholder="Search..."
				aria-label="Search"
				id={`searchOrFilterForm${id}`}
				value={queryValue}
				onFocus={() => onSearchSelect()}
				onChange={(e) => onChange(e.target.value, "search")}
			/>
			<button className="btn btn-outline-success my-2 my-sm-0" type="button">
				<i className="fa fa-search fa-lg" aria-hidden="true"></i>
			</button>
		</div>
	);
}

export default Search;
