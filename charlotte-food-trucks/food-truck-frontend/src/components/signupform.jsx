import React, { useState } from "react";
import Joi from "joi-browser";
import auth from "../services/authService";
import { toast, ToastContainer } from "react-toastify";

function SignupForm(props) {
	// schema for username and password
	const schema = {
		name: Joi.string().required().label("Name"),
		username: Joi.string().email().required().label("Username"),
		password: Joi.string().min(5).required().label("Password"),
	};

	// declaring state: errors and username/password object
	const [errors, setErrors] = useState({});
	const [values, setValues] = useState({
		name: "",
		username: "",
		password: "",
	});

	// when something is submitted
	const handleSubmit = (event) => {
		// stop default submission behavior
		event.preventDefault();

		const errors = validate();
		// don't submit if there are errors
		if (errors) return;

		// otherwise, we should submit the values to the DB to be saved
		doSubmit();
	};

	const doSubmit = () => {
		auth
			.signup(values.username, values.password)
			.then(() => {
				window.location = "/";
			})
			.catch((err) => {
				toast.error(`${err.response.data.error}`);
			});
	};

	// Validation of the current data in the form; this can happen
	// at any time and doesn't take an input
	const validate = () => {
		const options = { abortEarly: false };
		const { error } = Joi.validate(values, schema, options);
		if (!error) {
			return null;
		}
		const errors = {};
		// for of loop for iterating over error details object array.
		for (let item of error.details) errors[item.path[0]] = item.message;
		return errors;
	};

	// Validates one property on the form, updating errors
	// appropriately; we have this so that the user won't
	// be spammed with errors on a part of the form they
	// haven't even gotten to yet.
	const validateProperty = (input) => {
		const { error } = Joi.validate(
			{ [input.name]: input.value },
			{ [input.name]: schema[input.name] }
		);
		const errorMessage = error ? error.details[0].message : null;
		setErrors(() => {
			if (!errorMessage) {
				delete errors[input.name];
				return {
					...errors,
				};
			} else {
				return { ...errors, [input.name]: errorMessage };
			}
		});
		return errors;
	};

	const handleChange = ({ currentTarget: input }) => {
		validateProperty(input);
		setValues({ ...values, [input.name]: input.value });
	};

	return (
		<React.Fragment>
			<ToastContainer />
			<form onSubmit={handleSubmit} className="form-group">
				<label htmlFor="name">Name</label>
				<input
					type="text"
					name="name"
					onChange={handleChange}
					value={values.name}
					error={errors["name"]}
					className="form-control my-2"
				/>
				<label htmlFor="username">Username</label>
				<input
					className="form-control my-2"
					type="text"
					name="username"
					onChange={handleChange}
					value={values.username}
					error={errors["username"]}
				></input>
				{errors["username"] && (
					<div className="alert alert-danger">{errors["username"]}</div>
				)}
				<label htmlFor="password">Password</label>
				<input
					className="form-control my-2"
					type="password"
					name="password"
					onChange={handleChange}
					value={values.password}
					error={errors["password"]}
				></input>
				{errors["password"] && (
					<div className="alert alert-danger">{errors["password"]}</div>
				)}
				<button className="btn btn-primary" type="submit" disabled={validate()}>
					Login
				</button>
			</form>
		</React.Fragment>
	);
}

export default SignupForm;
