import { createSlice } from "@reduxjs/toolkit";

export const trucksSlice = createSlice({
	name: "trucks",
	initialState: {
		value: [],
	},
	reducers: {
		updateTrucks: (state, action) => {
			if (state.value !== action.payload) {
				state.value = action.payload;
			}
		},
	},
});

export const { updateTrucks } = trucksSlice.actions;

export default trucksSlice.reducer;
