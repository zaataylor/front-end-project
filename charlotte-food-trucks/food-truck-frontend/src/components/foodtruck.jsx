import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Favorite from "./favorite";

function FoodTrucks({ match }) {
	const trucks = useSelector((state) => state.trucks.value);
	// We want to see the table of all trucks
	if (match.params.id === "all") {
		return (
			<table className="table">
				<thead>
					<tr>
						<th>Truck Name</th>
						<th style={{ textAlign: "center" }}>Rating</th>
						<th style={{ textAlign: "center" }}>Favorite</th>
					</tr>
				</thead>
				<tbody>
					{trucks.map((truck) => (
						<tr key={truck.id}>
							<td>
								<Link to={`/foodtrucks/${truck.id}`}>{truck.name}</Link>
							</td>
							<td style={{ textAlign: "center" }}>{truck.rating}</td>
							<td style={{ textAlign: "center" }}>
								<Favorite truckId={truck.id} />
							</td>
						</tr>
					))}
				</tbody>
			</table>
		);
	} else {
		// try to find the truck in the array of trucks from the store
		const truck = trucks.find((trk) => trk.id === match.params.id);
		if (!truck) {
			return <h1>Couldn't find a food truck with ID {match.params.id}</h1>;
		}
		return (
			<React.Fragment>
				<h1>Truck Name: {truck.name}</h1>
				<h2>Truck Rating: {truck.rating}</h2>
			</React.Fragment>
		);
	}
}

export default FoodTrucks;
