import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./app/store";
import { updateTrucks } from "./features/trucks/trucksSlice";
import fts from "./services/foodTruckService";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import "font-awesome/css/font-awesome.css";

// function to initialize the store
async function initializeState() {
	const { data } = await fts.getAllTrucks();
	const { businesses: truckData } = data;
	return truckData;
}

// Get initialization data from the API, then update the
// state, and only then should we render the React App
initializeState()
	.then((result) => store.dispatch(updateTrucks(result)))
	.then(() =>
		ReactDOM.render(
			<React.StrictMode>
				<BrowserRouter>
					<Provider store={store}>
						<App />
					</Provider>
				</BrowserRouter>
			</React.StrictMode>,
			document.getElementById("root")
		)
	);
