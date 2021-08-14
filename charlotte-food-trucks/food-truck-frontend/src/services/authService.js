import http from "./httpService";
import dotenv from "dotenv";
import { apiUrl } from "../config.json";
import { verify } from "jsonwebtoken";
dotenv.config();
const tokenKey = "token";

export async function login(username, password) {
	const loginEndpoint = apiUrl + "/loginUser";
	try {
		const { token } = http.post(loginEndpoint, {
			username: username,
			password: password,
		});
		console.log(`Token after login is: ${token}`);
		localStorage.setItem(tokenKey, token);
		console.log(`Token set for ${username} with password ${password}!`);
	} catch (ex) {
		console.log(ex);
	}
}

export async function signup(username, password) {
	const createUserEndpoint = apiUrl + "/createUser";
	try {
		const response = await http.post(createUserEndpoint, {
			username: username,
			password: password,
		});
		console.log(`Response was: ${response}`);
		localStorage.setItem(tokenKey, "eh");
	} catch (ex) {
		console.log("Error: ", ex);
	}
}

export function logout() {
	localStorage.removeItem(tokenKey);
	console.log("Token removed!");
}

export function getJwt() {
	return localStorage.getItem(tokenKey);
}

export function getCurrentUser() {
	const token = getJwt();
	console.log("trying to get the current user with token=", token);
	return token ? verify(token, process.env.REACT_APP_TOKEN_SECRET).user : null;
}

const auth = {
	login,
	logout,
	getJwt,
	getCurrentUser,
	signup,
};

export default auth;
