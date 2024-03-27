/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

interface AddModalProps {
	isOpen: boolean;
	onClose: () => void;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	handleAddRoom: (data: any) => void;
}

const AddRoomModal = ({ isOpen, onClose, setOpen, handleAddRoom }: AddModalProps) => {
	const [data, setData] = useState({ title: "", description: "", image: "" });

	const handleChange = (e: any) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	const closeModal = () => {
		setOpen(false);
		onClose();
	};

	const handleSubmit = () => {
		handleAddRoom(data);
		closeModal();
	};

	const inputsClasses =
		"w-full rounded-md outline-none bg-[#1b1c24] border border-[#262730] py-3 px-2";
	return (
		<div
			className={`w-screen h-screen place-items-center absolute top-0 left-0 z-[100] ${
				isOpen ? "grid" : "hidden"
			}`}
		>
			<div
				className="w-full h-full bg-black opacity-70 absolute left-0 top-0 z-20"
				onClick={closeModal}
			></div>
			<div className="md:w-[30vw] w-[90%] bg-[#0b1419] border border-[#262730] rounded-lg shadow-md z-50 flex flex-col items-center gap-4 p-6">
				<input
					type="text"
					placeholder="Room Name"
					name="title"
					onChange={handleChange}
					className={inputsClasses}
				/>
				<input
					type="text"
					placeholder="Room Description"
					name="description"
					onChange={handleChange}
					className={inputsClasses}
				/>
				<input
					type="text"
					placeholder="Room Image URL"
					name="image"
					onChange={handleChange}
					className={inputsClasses}
				/>
				<button
					className="w-full mt-3 rounded-md h-9 bg-blue-900 text-blue-50 font-medium"
					onClick={handleSubmit}
				>
					Add Room
				</button>
			</div>
		</div>
	);
};

export default AddRoomModal;
