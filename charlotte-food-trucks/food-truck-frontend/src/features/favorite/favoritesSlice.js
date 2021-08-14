import { createSlice } from "@reduxjs/toolkit";

export const favoritesSlice = createSlice({
	name: "favorites",
	initialState: {
		value: [],
	},
	reducers: {
		addFavorite: (state, action) => {
			state.value.push(action.payload);
		},
		addMultipleFavorites: (state, action) => {
			state.value = [...state.value, ...action.payload];
		},
		removeFavorite: (state, action) => {
			const index = state.value.indexOf(action.payload);
			state.value.splice(index, 1);
		},
	},
});

export const { addFavorite, addMultipleFavorites, removeFavorite } =
	favoritesSlice.actions;

export default favoritesSlice.reducer;
