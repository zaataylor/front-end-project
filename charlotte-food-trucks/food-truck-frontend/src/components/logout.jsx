import auth from "../services/authService";

function Logout(props) {
	auth.logout();
	window.location = "/login";
	return null;
}

export default Logout;
