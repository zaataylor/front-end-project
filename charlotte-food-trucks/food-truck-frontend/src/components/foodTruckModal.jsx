import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addMultipleFavorites } from "../features/favorite/favoritesSlice";

function Modal({ show, onClose, content }) {
	const dispatch = useDispatch();
	const [checkedItems, setCheckedItems] = useState([]);
	const handleChange = (itemId) => {
		// if the item is in the list, let's remove it
		if (checkedItems.includes(itemId)) {
			setCheckedItems((prevItems) =>
				prevItems.filter((prevItemId) => prevItemId !== itemId)
			);
		} else {
			// otherwise, lets add it
			setCheckedItems((prevItems) => [...prevItems, itemId]);
		}
	};
	const showModal = show
		? "modal modal-md display-block"
		: "modal display-none";
	return (
		<React.Fragment>
			<div className={showModal} id="fooTruckModal">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header text-center">
							<h5 className="modal-title">Filters</h5>
							<span
								aria-hidden="true"
								onClick={() => {
									setCheckedItems([]);
									onClose();
								}}
								style={{ cursor: "pointer" }}
							>
								<i className="fa fa-times"></i>
							</span>
						</div>
						<div className="modal-body">
							{content.map((truckItem) => (
								<div key={truckItem.id} className="form-check">
									<input
										className="form-check-input"
										type="checkbox"
										value={truckItem.id}
										checked={checkedItems.includes(truckItem.id)}
										onChange={() => {
											handleChange(truckItem.id);
										}}
									/>
									<label
										className="form-check-label"
										htmlFor="flexCheckDefault"
									>
										{truckItem.name} ({truckItem.rating}/5)
									</label>
								</div>
							))}
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-secondary"
								disabled={checkedItems.length > 0 ? false : true}
								onClick={() => {
									dispatch(addMultipleFavorites(checkedItems));
									setCheckedItems([]);
									onClose();
								}}
							>
								Add
							</button>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}

export default Modal;
