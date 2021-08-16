import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Map from "../components/map";

let container = null;
beforeEach(() => {
	// setup a DOM element as a render target
	container = document.createElement("div");
	document.body.appendChild(container);
});

afterEach(() => {
	// cleanup on exiting
	unmountComponentAtNode(container);
	container.remove();
	container = null;
});

it("Renders map with containing no popups", () => {
	act(() => {
		render(<Map trucks={[]} />, container);
	});

	// get the popups based on class
	const popups = document.querySelectorAll("img[class='leaflet-marker-icon']");
	// check that there are no popups
	expect(popups.length).toEqual(0);
});

it("Renders map containing 2 popups", () => {
	// set trucks equal to two truck objects
	const trucks = [
		{
			name: "Food Truck 1",
			id: 0,
			coordinates: {
				latitude: 51.25,
				longitude: 52.35,
			},
		},
		{
			name: "Food Truck 2",
			id: 1,
			coordinates: {
				latitude: 49.78,
				longitude: 23.33,
			},
		},
	];
	act(() => {
		render(<Map trucks={trucks} />, container);
	});

	// get the popups based on class
	const popupMarkerIcons = document.querySelectorAll(
		".leaflet-marker-icon",
		".leaflet-interactive"
	);
	// check that there are two popupMarkerIcons
	expect(popupMarkerIcons.length).toEqual(2);
});
