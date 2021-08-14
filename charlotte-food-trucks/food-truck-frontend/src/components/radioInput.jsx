import React from "react";

function RadioInput({ name, content, defaultChecked, onClick }) {
	if (defaultChecked) {
		return (
			<label className="filter-radio" content={content}>
				<input
					className="form-check-input check-and-radio-inputs"
					type="radio"
					defaultChecked
					name={name}
				/>
				{content}
			</label>
		);
	} else {
		return (
			<label className="filter-radio" content={content}>
				<input
					className="form-check-input check-and-radio-inputs"
					type="radio"
					name={name}
				/>
				{content}
			</label>
		);
	}
}

export default RadioInput;
