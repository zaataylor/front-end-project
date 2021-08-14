import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Navbar from "./components/navbar";
import NotFound from "./components/notFound";
import Logout from "./components/logout";
import Favorites from "./components/favorites";
import Home from "./components/home";
import FoodTrucks from "./components/foodtruck";
import LoginForm from "./components/loginForm";
import SignupForm from "./components/signupForm";
import "./App.css";

function App() {
	return (
		<React.Fragment>
			<Navbar />
			<Switch>
				<ProtectedRoute path="/logout" component={Logout}></ProtectedRoute>
				<Route path="/login" component={LoginForm}></Route>
				<Route path="/signup" component={SignupForm}></Route>
				<ProtectedRoute
					path="/favorites"
					component={Favorites}
				></ProtectedRoute>
				<ProtectedRoute
					path="/foodtrucks/:id"
					component={FoodTrucks}
				></ProtectedRoute>
				<ProtectedRoute path="/" exact component={Home}></ProtectedRoute>
				<Route path="/not-found" component={NotFound} />
				<Redirect from="/foodtrucks" to="/foodtrucks/all" />
				<Redirect to="/not-found" />
			</Switch>
		</React.Fragment>
	);
}

export default App;
