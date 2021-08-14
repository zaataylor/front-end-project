import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FoodTruckModal from "./foodTruckModal";
import { removeFavorite } from "../features/favorite/favoritesSlice";

function Favorites(props) {
	const trucks = useSelector((state) => state.trucks.value);
	const favorites = useSelector((state) => state.favorites.value);
	const favoritedTrucks = trucks.filter((truck) =>
		favorites.includes(truck.id)
	);
	const dispatch = useDispatch();

	// Functions for showing/hiding the modal
	const [show, setShow] = useState(false);
	const showModal = () => {
		setShow(true);
	};
	const hideModal = () => {
		setShow(false);
	};
	if (favoritedTrucks.length === 0) {
		return (
			<React.Fragment>
				<div className="text-center display-4">
					Currently, you haven't favorited any trucks! Favorite a truck in the
					main <span> </span>
					<Link to="/foodtrucks/all" style={{ textDecorationLine: "none" }}>
						food truck view
					</Link>
					<span> </span>
					or add one by clicking the button below!
				</div>
				<div className="col text-center">
					<button className="btn btn-primary" onClick={showModal}>
						Add favorite
					</button>
				</div>
				<FoodTruckModal show={show} onClose={hideModal} content={trucks} />
			</React.Fragment>
		);
	} else {
		return (
			<React.Fragment>
				<table className="table">
					<thead>
						<tr>
							<th>Truck Name</th>
							<th style={{ textAlign: "center" }}>Rating</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{favoritedTrucks.map((truck) => (
							<tr key={truck.id}>
								<td>
									<Link to={`/foodtrucks/${truck.id}`}>{truck.name}</Link>
								</td>
								<td style={{ textAlign: "center" }}>{truck.rating}</td>
								<td>
									<button
										className="btn btn-danger"
										onClick={() => dispatch(removeFavorite(truck.id))}
									>
										Remove Favorite
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<div className="col text-center">
					<button className="btn btn-primary" onClick={showModal}>
						Add favorite
					</button>
				</div>
				<FoodTruckModal
					show={show}
					onClose={hideModal}
					content={trucks.filter((truck) => !favoritedTrucks.includes(truck))}
				/>
			</React.Fragment>
		);
	}
}

export default Favorites;
