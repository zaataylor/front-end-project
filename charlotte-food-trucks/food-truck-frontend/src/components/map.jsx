import React from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { defaultCenterPosition as position } from "../config.json";

function Map({ trucks }) {
	return (
		<MapContainer
			id="mapid"
			center={position}
			zoom={13}
			scrollWheelZoom={false}
		>
			<TileLayer
				attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{trucks.map((truck) => {
				const { latitude, longitude } = truck.coordinates;
				return (
					<Marker position={[latitude, longitude]} key={truck.id}>
						<Popup>
							<Link
								to={`/foodtrucks/${truck.id}`}
								style={{ textDecorationLine: "none" }}
							>
								{truck.name}
							</Link>
						</Popup>
					</Marker>
				);
			})}
		</MapContainer>
	);
}

export default Map;
