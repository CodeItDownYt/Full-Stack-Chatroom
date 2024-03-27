/* eslint-disable @typescript-eslint/no-explicit-any */
import RoomNavbar from "../../components/RoomNavbar";
import RenderChats from "../../components/RenderChats";
import ChatInput from "../../components/ChatInput";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { GetRoomTitle } from "../../services/Rooms";

const Room = () => {
	const [title, setTitle] = useState("");
	const params = useParams();
	const roomId = params.roomId || "0";

	useEffect(() => {
		GetRoomTitle(roomId).then((res: any) => {
			setTitle(res.data.title);
		});
	}, [roomId]);

	return (
		<div className="w-full h-full relative">
			<RoomNavbar roomTitle={title} />
			<RenderChats roomId={roomId} />
			<ChatInput />
		</div>
	);
};

export default Room;
