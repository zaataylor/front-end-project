import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { reviewCountDefaults, ratingDefaults } from "../config.json";
import RadioInput from "./radioInput";
import CheckboxInput from "./checkboxInput";
import { resetFilters, updateFilters } from "../features/filter/filterSlice";

// Construct the categories needed by the component
export const flattenCategories = (categories) =>
	categories.map((c) => c["title"]);

const defaultFilter = {
	categories: [],
	rating: 1,
	prices: [],
	review_count: 1,
};

function FilterModal({ show, onClose, onFilter }) {
	const dispatch = useDispatch();
	// Using the truck information and some reasonable defaults,
	// make a filter object that will dynamically
	// generate an object representing categories that can be
	// filtered on
	const makeFilterViewObject = (trucks) => {
		const filterViewObj = {
			review_count: reviewCountDefaults,
			categories: [],
			prices: [],
			rating: ratingDefaults,
		};
		trucks.map((truck) => {
			// Here, we flatten the array of objects in the
			// categories property of each truck and filter
			// it so we only add unique categories to the list
			// of those in our final returned object
			const uniqueFlattenedCategories = flattenCategories(
				truck["categories"]
			).filter((c) => !filterViewObj.categories.includes(c));
			filterViewObj.categories.push(...uniqueFlattenedCategories);
			// We also add price indicators in the pricing section if there
			// are any for any of the trucks
			if (truck["price"] && !filterViewObj.prices.includes(truck.price)) {
				filterViewObj.prices.push(truck.price);
			}
			return null;
		});

		filterViewObj.categories.sort();
		filterViewObj.prices.sort();
		return filterViewObj;
	};
	const trucks = useSelector((state) => state.trucks.value);
	const filterViewObject = makeFilterViewObject(trucks);

	// Processes a submitted form, extracting the values
	// of the fields that have been checked by the user and
	// returning these in the form of a filter object
	const processForm = (form) => {
		var selectedFilter = {
			categories: [],
			rating: 1,
			prices: [],
			review_count: 1,
		};

		const fieldsetNames = ["categories", "rating", "prices", "review_count"];
		for (let name of fieldsetNames) {
			for (let item of form.elements[name]) {
				if (item.checked) {
					if (typeof selectedFilter[name] === "object") {
						selectedFilter[name].push(item.nextSibling.data);
					} else {
						selectedFilter[name] = item.nextSibling.data;
					}
				}
			}
		}

		return selectedFilter;
	};

	const showModal = show
		? "modal modal-md display-block"
		: "modal display-none";
	return (
		<React.Fragment>
			<div className={showModal} id="filterModal">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Food Truck Filter</h5>
							<span
								aria-hidden="true"
								onClick={() => {
									onClose();
								}}
								style={{ cursor: "pointer" }}
							>
								<i className="fa fa-times"></i>
							</span>
						</div>
						<form
							id="food-truck-filter"
							onSubmit={(e) => {
								e.preventDefault();
								const submitterName = e.nativeEvent.submitter.firstChild.data;
								// We clicked the filter button
								if (submitterName === "Filter") {
									const filterObject = processForm(e.target);
									onFilter(filterObject, "filter");
									// update the Redux Filter object
									dispatch(updateFilters(filterObject));
								} else {
									// Otherwise, we clicked the reset button
									e.target.reset();
									//Put the popups back on the screen
									onFilter(defaultFilter, "filter");
									// reset the Redux filter object
									dispatch(resetFilters());
								}
							}}
						>
							<div className="modal-body">
								<fieldset id="categories">
									{/* Checkboxes */}
									<legend>Categories</legend>
									{filterViewObject.categories.map((c) => (
										<CheckboxInput content={c} key={c} name="categories" />
									))}
								</fieldset>
								<fieldset id="rating">
									{/* Radio Buttons */}
									<legend>Rating greater than or equal to:</legend>
									{filterViewObject.rating.map((c) => {
										if (c === 1) {
											return (
												<RadioInput
													content={c}
													key={c}
													name="rating"
													defaultChecked={true}
												/>
											);
										} else {
											return <RadioInput content={c} key={c} name="rating" />;
										}
									})}
								</fieldset>
								<fieldset id="prices">
									{/* Checkboxes */}
									<legend>Price</legend>
									{filterViewObject.prices.map((c) => (
										<CheckboxInput content={c} key={c} name="prices" />
									))}
								</fieldset>
								<fieldset id="review_count">
									{/* Radio Buttons */}
									<legend>Review Count greater than:</legend>
									{filterViewObject.review_count.map((c) => {
										if (c === 1) {
											return (
												<RadioInput
													content={c}
													key={c}
													name="review_count"
													defaultChecked={true}
												/>
											);
										} else {
											return (
												<RadioInput
													content={c}
													key={c}
													name="review_count"
													defaultChecked={false}
												/>
											);
										}
									})}
								</fieldset>
							</div>
							<div className="modal-footer">
								<button type="submit" className="btn btn-secondary">
									Filter
								</button>
								<button type="submit" className="btn btn-danger">
									Reset
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}

export default FilterModal;
