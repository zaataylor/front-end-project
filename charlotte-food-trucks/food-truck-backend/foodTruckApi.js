const config = require("./config.json");
const http = require("axios");
const dotenv = require("dotenv");
// get config vars
dotenv.config();

module.exports.truckLimit = 50;

module.exports.getTrucks = (offset = 0) => {
	const { apiUrl, businessCategory, defaultCenterPosition } = config;
	const apiEndpoint = apiUrl + "/search";

	const category = businessCategory;
	const [latitude, longitude] = defaultCenterPosition;
	const queryString = `?categories=${category}&latitude=${latitude}&longitude=${longitude}&limit=${this.truckLimit}&offset=${offset}`;

	const query = apiEndpoint + queryString;
	return http.get(query, {
		headers: {
			Authorization: `Bearer ${process.env.YELP_API_KEY}`,
		},
	});
};
