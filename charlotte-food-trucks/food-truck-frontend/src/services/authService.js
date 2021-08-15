import http from "./httpService";
import dotenv from "dotenv";
import { apiUrl } from "../config.json";
import { verify } from "jsonwebtoken";
dotenv.config();
const tokenKey = "token";

export async function login(username, password) {
	const loginEndpoint = apiUrl + "/loginUser";
	try {
		const response = await http.post(loginEndpoint, {
			username: username,
			password: password,
		});
		const { token } = response.data;
		localStorage.setItem(tokenKey, token);
		return Promise.resolve();
	} catch (err) {
		console.log("Exception was: ", err);
		return Promise.reject(err);
	}
}

export async function signup(username, password) {
	const createUserEndpoint = apiUrl + "/createUser";
	try {
		const response = await http.post(createUserEndpoint, {
			username: username,
			password: password,
		});
		const { token } = response.data;
		localStorage.setItem(tokenKey, token);
		Promise.resolve();
	} catch (ex) {
		Promise.reject(ex);
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
	if (token) {
		return verify(token, process.env.REACT_APP_TOKEN_SECRET).user;
	} else {
		return null;
	}
}

const auth = {
	login,
	logout,
	getJwt,
	getCurrentUser,
	signup,
};

export default auth;
