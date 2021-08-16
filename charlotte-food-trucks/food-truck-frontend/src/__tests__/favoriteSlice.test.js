import reducer, {
	addFavorite,
	addMultipleFavorites,
	removeFavorite,
} from "../features/favorite/favoritesSlice";

it("Should return the initial state", () => {
	expect(reducer(undefined, {})).toEqual({ value: [] });
});

it("Should return the state array with one value", () => {
	const previousState = { value: [] };
	expect(reducer(previousState, addFavorite("a-new-favorite"))).toEqual({
		value: ["a-new-favorite"],
	});
});

it("Should return the state array with multiple values", () => {
	const previousState = { value: [] };
	expect(
		reducer(
			previousState,
			addMultipleFavorites([
				"1-new-favorite",
				"2-new-favorites",
				"3-new-favorites",
			])
		)
	).toEqual({
		value: ["1-new-favorite", "2-new-favorites", "3-new-favorites"],
	});
});

it("Should return the state array with one value removed", () => {
	const previousState = {
		value: ["1-new-favorite", "2-new-favorites", "3-new-favorites"],
	};
	expect(reducer(previousState, removeFavorite("1-new-favorite"))).toEqual({
		value: ["2-new-favorites", "3-new-favorites"],
	});
});
