import { createSlice } from "@reduxjs/toolkit";

export const defaultFilterObject = {
	categories: [],
	rating: 1,
	prices: [],
	review_count: 1,
};

export const filterSlice = createSlice({
	name: "filters",
	initialState: {
		value: defaultFilterObject,
	},
	reducers: {
		updateFilters: (state, action) => {
			if (state.value !== action.payload) {
				state.value = action.payload;
			}
		},
		resetFilters: (state) => {
			state.value = defaultFilterObject;
		},
	},
});

export const { updateFilters, resetFilters } = filterSlice.actions;

export default filterSlice.reducer;
