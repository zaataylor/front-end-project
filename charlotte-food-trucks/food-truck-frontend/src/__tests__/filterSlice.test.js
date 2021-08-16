import reducer, {
	updateFilters,
	resetFilters,
} from "../features/filter/filterSlice";

it("Should return the initial state", () => {
	expect(reducer(undefined, {})).toEqual({
		value: {
			categories: [],
			rating: 1,
			prices: [],
			review_count: 1,
		},
	});
});

it("Should return filter with two price options and 1 added category", () => {
	const previousState = {
		value: {
			categories: [],
			rating: 1,
			prices: [],
			review_count: 1,
		},
	};
	expect(
		reducer(
			previousState,
			updateFilters({
				categories: ["Hungarian"],
				rating: 1,
				prices: ["$", "$$"],
				review_count: 1,
			})
		)
	).toEqual({
		value: {
			categories: ["Hungarian"],
			rating: 1,
			prices: ["$", "$$"],
			review_count: 1,
		},
	});
});

it("Should return default filter object", () => {
	const previousState = {
		value: {
			categories: ["Hungarian"],
			rating: 1,
			prices: ["$", "$$"],
			review_count: 1,
		},
	};
	expect(reducer(previousState, resetFilters())).toEqual({
		value: {
			categories: [],
			rating: 1,
			prices: [],
			review_count: 1,
		},
	});
});
