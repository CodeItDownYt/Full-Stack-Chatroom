/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { EllipsisVertical } from "react-ionicons";
import { useNavigate } from "react-router";
import { io } from "socket.io-client";
import { GetRooms } from "../../services/Rooms";

const RenderRooms = () => {
	const [rooms, setRooms] = useState<any[]>([]);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchRooms = async () => {
			try {
				const response = await GetRooms();
				setRooms(response.data);
			} catch (error) {
				console.error("Error fetching rooms:", error);
			}
		};
		fetchRooms();

		const socket = io("http://localhost:5000");

		socket.on("newRoom", (newRoom) => {
			setRooms((prevRooms) => {
				const isRoomExist = prevRooms.some((room) => room.id === newRoom.id);
				if (!isRoomExist) {
					return [...prevRooms, newRoom];
				} else {
					return prevRooms;
				}
			});
		});

		return () => {
			socket.disconnect();
		};
	}, []);

	return (
		<div className="w-full flex flex-col overflow-y-auto max-h-[700px]">
			{rooms.map((room: any, index) => (
				<div
					key={index}
					onClick={() => navigate(`/room/${room.id}`)}
					className="w-full flex items-center justify-between border-b border-b-[#262730] cursor-pointer transition-all duration-200 hover:bg-gray-800 px-2 py-3 rounded-lg"
				>
					<div className="flex items-center gap-2">
						<img
							src={room.image}
							alt={room.title}
							className="rounded-full md:w-[55px] md:h-[52px] w-[40px] h-[25px]"
						/>
						<div className="flex flex-col gap-1">
							<span className="font-medium md:block hidden">{room.title}</span>
							<p className="text-[13px] font-light text-gray-400 md:block hidden">
								{room.description.substring(0, 15)}...
							</p>
						</div>
					</div>
					<EllipsisVertical
						color={"#fff"}
						cssClasses={"md:block hidden cursor-pointer"}
						width="17px"
						height="17px"
					/>
				</div>
			))}
		</div>
	);
};

export default RenderRooms;
