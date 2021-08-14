import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	addFavorite,
	removeFavorite,
} from "../features/favorite/favoritesSlice";

function Favorite({ truckId }) {
	const favorited = useSelector((state) =>
		state.favorites.value.find((id) => id === truckId)
	);
	const dispatch = useDispatch();

	return (
		<div>
			<i
				className={favorited ? "fa fa-star" : "fa fa-star-o"}
				onClick={() => {
					if (favorited) {
						dispatch(removeFavorite(truckId));
					} else {
						dispatch(addFavorite(truckId));
					}
				}}
			></i>
		</div>
	);
}

export default Favorite;
