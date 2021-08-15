import axios from "axios";

// Interceptor that handles errors before being handled
// by subsequent promises
axios.interceptors.response.use(null, (error) => {
	// These types of errors happen all the time,
	// and are client errors
	const normalError =
		error.response &&
		error.response.status >= 400 &&
		error.response.status < 500;

	// Things outside of normal errors are different
	if (!normalError) {
		error.response = {
			data: {
				error: "Unexpected error occurred!",
			},
		};
	}
	return Promise.reject(error);
});

const http = {
	get: axios.get,
	put: axios.put,
	post: axios.post,
	patch: axios.patch,
	delete: axios.delete,
};

export default http;
