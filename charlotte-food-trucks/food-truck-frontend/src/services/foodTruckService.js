import http from "./httpService";
import { apiUrl } from "../config.json";

export function getAllTrucks() {
	const apiEndpoint = apiUrl + "/getAllTrucks";
	return http.get(apiEndpoint);
}

const fts = {
	getAllTrucks,
};

export default fts;
