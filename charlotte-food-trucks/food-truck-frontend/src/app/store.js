import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "../features/favorite/favoritesSlice";
import trucksReducer from "../features/trucks/trucksSlice";
import filtersReducer from "../features/filter/filterSlice";

export default configureStore({
	reducer: {
		favorites: favoritesReducer,
		trucks: trucksReducer,
		filters: filtersReducer,
	},
});
