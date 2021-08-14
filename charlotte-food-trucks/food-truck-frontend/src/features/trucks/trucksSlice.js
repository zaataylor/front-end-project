import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import fts from "../../services/foodTruckService";

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

export const fetchTrucks = () => {
	return async function (dispatch, getState) {
		// make asynchronous call to the API to get the
		// current food trucks in the area
		try {
			const { data } = await fts.getAllTrucks();
			const { businesses: truckData } = data;
			dispatch(updateTrucks(truckData));
		} catch (ex) {
			if (ex.response && ex.response.status === 400) {
				toast.error(ex.response.statusText);
			}
		}
	};
};

export const { updateTrucks } = trucksSlice.actions;

export default trucksSlice.reducer;
