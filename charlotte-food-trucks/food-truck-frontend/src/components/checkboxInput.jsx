import React from "react";

function CheckboxInput({ name, content, defaultChecked, onClick }) {
	if (defaultChecked) {
		return (
			<label className="filter-checkbox" content={content}>
				<input
					className="form-check-input check-and-radio-inputs"
					type="checkbox"
					defaultChecked
					name={name}
				/>
				{content}
			</label>
		);
	} else {
		return (
			<label className="filter-checkbox" content={content}>
				<input
					className="form-check-input check-and-radio-inputs"
					type="checkbox"
					name={name}
				/>
				{content}
			</label>
		);
	}
}

export default CheckboxInput;
