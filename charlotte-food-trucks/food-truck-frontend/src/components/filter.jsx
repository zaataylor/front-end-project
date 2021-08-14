import React, { useState } from "react";
import { defaultFilterObject } from "../features/filter/filterSlice";
import FilterModal, { flattenCategories } from "./filterModal";

export const handleFilter = (filters, data) => {
	if (filters === defaultFilterObject) {
		return data;
	} else {
		const { categories, rating, prices, review_count } = filters;
		const filteredData = data
			.filter((t) => {
				if (categories.length === 0) {
					return true;
				} else {
					return flattenCategories(t.categories).some((c) =>
						categories.includes(c)
					);
				}
			})
			.filter((t) => t.rating >= rating)
			.filter((t) => {
				if (prices.length === 0) {
					return true;
				} else {
					if (t.price) {
						return prices.includes(t.price);
					} else {
						return false;
					}
				}
			})
			.filter((t) => t.review_count >= review_count);
		return filteredData;
	}
};

function Filter({ onFilter, onFilterSelect }) {
	// handling Filter modal
	const hideModal = () => {
		setShowModal(false);
	};
	const [showModal, setShowModal] = useState(false);

	return (
		<div className="flex-child">
			<FilterModal
				show={showModal}
				onClose={hideModal}
				onFilter={onFilter}
			></FilterModal>
			<button
				className="btn btn-outline-danger my-2 my-sm-0"
				type="button"
				onClick={() => {
					setShowModal(true);
					onFilterSelect();
				}}
			>
				<i className="fa fa-sliders fa-lg" aria-hidden="true"></i>
			</button>
		</div>
	);
}
export default Filter;
