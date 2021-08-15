const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const firebase = require("firebase/app");
require("firebase/database");
const dotenv = require("dotenv");
dotenv.config();

const crypto = require("crypto");

const fts = require("./foodTruckApi");
const { firebaseConfig } = require("./config.json");
firebase.initializeApp(firebaseConfig);

const sha256 = (x) =>
	crypto.createHash("sha256").update(x, "utf8").digest("hex");

function generateAccessToken(username) {
	return jwt.sign({ user: username }, process.env.TOKEN_SECRET);
}

async function writeUserData(hash, username) {
	return await firebase
		.database()
		.ref("users/" + hash)
		.set({ username })
		.then(() => {
			return Promise.resolve();
		})
		.catch((err) => {
			return Promise.reject(err);
		});
}

async function readUserData(hash) {
	return await firebase
		.database()
		.ref("users")
		.child(hash)
		.get()
		.then((value) => {
			if (value.exists()) {
				return Promise.resolve();
			} else {
				return Promise.reject("Invalid username or password!");
			}
		})
		.catch((err) => {
			return Promise.reject(err);
		});
}

// Headers applied to each response, to resolve
// CORS issues
app.use((req, res, next) => {
	res.append("Access-Control-Allow-Origin", ["*"]);
	res.append("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
	res.append("Access-Control-Allow-Headers", "Content-Type");
	res.append("Cache-Control", "max-age=60");
	next();
});
app.use(express.json());

app.post("/api/createUser", (req, res) => {
	const { username } = req.body;
	const { password } = req.body;
	// Create a hash of the username and password
	const hash = sha256(`${username}+${password}`);
	// Store the username and hash in the Firebase Realtime DB
	writeUserData(hash, username)
		.then(() => {
			const accessToken = generateAccessToken(username);
			res.json({ token: accessToken });
		})
		.catch((err) => {
			res.status(500).json({ error: err });
		});
});

app.post("/api/loginUser", (req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	const hash = sha256(`${username}+${password}`);

	// Query the DB to see if hash of username and
	// password are in the DB
	readUserData(hash)
		.then(() => {
			const accessToken = generateAccessToken(username);
			res.json({ token: accessToken });
		})
		.catch((err) => {
			res.status(404).json({ error: err });
		});
});

app.get("/api/getAllTrucks", async (req, res) => {
	// Here, we use the foodTruckApi module to call
	// the Yelp API
	const { data } = await fts.getTrucks();
	const { businesses } = data;
	const remainingQueries = Math.ceil(data.total / fts.truckLimit) - 1;
	for (let i = 1; i <= remainingQueries; i++) {
		const { data: newData } = await fts.getTrucks(fts.truckLimit * i);
		const { businesses: newBusinesses } = newData;
		businesses.push(...newBusinesses);
	}
	res.json(data);
});

app.listen(process.env.PORT, () => {
	console.log(`Server is listening on port ${process.env.PORT}`);
});
