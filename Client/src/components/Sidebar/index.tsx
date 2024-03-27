/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AddOutline, SearchOutline } from "react-ionicons";
import RenderRooms from "../RenderRooms";
import { AddRoom } from "../../services/Rooms";
import { useState } from "react";
import AddRoomModal from "../AddRoomModal";

const Sidebar = () => {
	const [modal, setModal] = useState(false);

	const handleAddRoom = (data: any) => {
		AddRoom(data.title, data.description, data.image).catch((error) => {
			console.error("Error adding room:", error);
		});
	};
	return (
		<>
			<div className="md:w-[370px] w-[80px] h-screen absolute left-0 bg-[#0b1419] border-r border-[#262730] p-5">
				<div className="flex items-center w-full md:justify-between justify-center bg-[#1b1c24] rounded-md border border-[#262730] px-3 py-2 mb-4">
					<input
						type="text"
						placeholder="Search"
						className="w-full bg-transparent outline-none md:block hidden"
					/>
					<SearchOutline color="#fff" />
				</div>
				<RenderRooms />
				<div className="w-full absolute bottom-3 left-0 p-5">
					<div
						className="w-full flex items-center gap-2 justify-center rounded-lg px-4 py-3 cursor-pointer bg-[#262730] border border-gray-700"
						onClick={() => setModal(true)}
					>
						<AddOutline color={"#fff"} />
						<span className="md:block hidden">New Room</span>
					</div>
				</div>
			</div>
			{modal && (
				<AddRoomModal
					isOpen={modal}
					setOpen={setModal}
					onClose={() => setModal(false)}
					handleAddRoom={handleAddRoom}
				/>
			)}
		</>
	);
};

export default Sidebar;
