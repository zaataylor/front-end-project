import React from "react";
import { NavLink, Link } from "react-router-dom";

function Navbar(props) {
	return (
		<nav
			className="navbar navbar-expand-lg navbar-light"
			style={{ backgroundColor: "rgb(18, 111, 204)" }}
		>
			<Link className="navbar-brand text-white" to="/">
				Home
			</Link>
			<div>
				<ul className="navbar-nav me-auto mb-2 mb-lg-0">
					<NavLink className="nav-item nav-link text-white" to="/foodtrucks">
						Food Trucks
					</NavLink>
					<NavLink className="nav-item nav-link text-white" to="/favorites">
						Favorites
					</NavLink>
					<NavLink className="nav-item nav-link text-white" to="/logout">
						Logout
					</NavLink>
				</ul>
			</div>
		</nav>
	);
}

export default Navbar;
