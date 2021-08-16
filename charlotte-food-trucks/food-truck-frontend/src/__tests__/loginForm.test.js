import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";

import LoginForm from "../components/loginform";

let container = null;
beforeEach(() => {
	// setup a DOM element as a render target
	container = document.createElement("div");
	document.body.appendChild(container);
});

afterEach(() => {
	// cleanup on exiting
	unmountComponentAtNode(container);
	container.remove();
	container = null;
});

it("Renders with disabled login button for missing or invalid input", () => {
	// Render the form
	act(() => {
		render(<LoginForm />, container);
	});

	// Check that login button is disabled initially
	const loginButton = document.querySelector("[type=submit]");
	expect(loginButton.innerHTML).toBe("Login");
	expect(loginButton.disabled).toBe(true);

	// Add invalid input to both username and password inputs and
	// ensure that the login button is no longer disabled
	const userNameInput = document.querySelector('input[name="username"]');
	const passwordInput = document.querySelector('input[name="password"]');
	userEvent.type(userNameInput, "bob");
	userEvent.type(passwordInput, "1234");

	expect(loginButton.disabled).toBe(true);
});

it("Renders with enabled login button when inputs are valid", () => {
	// Render the form
	act(() => {
		render(<LoginForm />, container);
	});

	// Check that login button is disabled initially
	const loginButton = document.querySelector("[type=submit]");
	expect(loginButton.innerHTML).toBe("Login");

	// Add valid input to both username and password inputs and
	// ensure that the login button is no longer disabled
	const userNameInput = document.querySelector('input[name="username"]');
	const passwordInput = document.querySelector('input[name="password"]');
	userEvent.type(userNameInput, "bob@uconn.edu");
	userEvent.type(passwordInput, "12345");

	expect(loginButton.disabled).toBe(false);
});
