import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Map from "./map";
import Search, { handleQuery } from "./search";
import Filter, { handleFilter } from "./filter";
import { resetFilters } from "../features/filter/filterSlice";

function Home() {
	// Redux truck state and mutable React state that can track
	// the changes based on searching or filtering
	const trucks = useSelector((state) => state.trucks.value);
	const [filteredTrucks, setFilteredTrucks] = useState(trucks);

	// State for query value and current filter settings
	const [queryValue, setQueryValue] = useState("");
	const currentFilters = useSelector((state) => state.filters.value);

	// handling search queries and filtering
	const handleChange = (queryOrFilter, queryType) => {
		var filteredData = {};
		// set filtered trucks here depending on
		// what we're using
		if (queryType === "search") {
			setQueryValue(queryOrFilter);
			filteredData = handleQuery(queryOrFilter, trucks);
		} else {
			filteredData = handleFilter(queryOrFilter, trucks);
		}
		if (filteredData !== filteredTrucks) {
			setFilteredTrucks(filteredData);
		}
	};

	const dispatch = useDispatch();
	return (
		<React.Fragment>
			<div className="d-flex" style={{ fontSize: "1.5rem" }}>
				<div id="placeName">Charlotte, NC</div>
				<div className="flex-container">
					<Search
						queryValue={queryValue}
						onChange={handleChange}
						onSearchSelect={() => {
							setFilteredTrucks(trucks);
							dispatch(resetFilters());
						}}
						id="home"
					></Search>
					<Filter
						onFilter={handleChange}
						onFilterSelect={() => {
							setQueryValue("");
							handleChange(currentFilters, "filter");
						}}
					></Filter>
				</div>
			</div>
			<Map trucks={filteredTrucks}></Map>
		</React.Fragment>
	);
}

export default Home;
