import auth from "../services/authService";

function Logout(props) {
	auth.logout();
	console.log("Now on Logout!");
	window.location = "/login";
	return null;
}

export default Logout;
