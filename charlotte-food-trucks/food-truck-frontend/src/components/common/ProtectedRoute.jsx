import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../../services/authService";

function ProtectedRoute({ path, component: Component }, ...rest) {
	if (!auth.getCurrentUser()) {
		return <Redirect to="/login"></Redirect>;
	}
	return <Route {...rest} path={path} component={Component}></Route>;
}

export default ProtectedRoute;
