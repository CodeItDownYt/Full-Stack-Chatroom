/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { GetRoomMessages } from "../../services/Rooms";

interface Props {
	roomId: string;
}

const RenderChats = ({ roomId }: Props) => {
	const [messages, setMessages] = useState<any[]>([]);
	const [currentUserId, setCurrentUserId] = useState("");
	let userId = localStorage.getItem("userId") || "";

	const generateUserId = () => {
		return Math.random().toString(36).substring(2);
	};

	useEffect(() => {
		if (!roomId) {
			setMessages([]);
			return;
		}

		const socket = io("http://localhost:5000");

		socket.emit("join", roomId);

		if (userId === "") {
			userId = generateUserId();
			localStorage.setItem("userId", userId);
		}
		setCurrentUserId(userId);

		socket.on("message", (data) => {
			setMessages((prevMessages) => [...prevMessages, data]);
		});

		const fetchMessages = async () => {
			try {
				const response = await GetRoomMessages(roomId);

				if (!response.data || !response.data.length) {
					setMessages([]);
				} else {
					setMessages(response.data);
				}
			} catch (error) {
				console.error("Error fetching messages:", error);
			}
		};
		fetchMessages();

		return () => {
			socket.disconnect();
		};
	}, [roomId]);

	const isCurrentUserMessage = (userId: string) => {
		return userId === currentUserId;
	};

	return (
		<div className="flex flex-col gap-5 overflow-y-auto max-h-[85vh] pt-[100px] pb-[20px] px-5">
			{messages.map((message, index) => (
				<div
					className={`w-full ${isCurrentUserMessage(message.userId) ? "dir-rtl" : ""}`}
					key={index}
				>
					<div className="flex items-start gap-3 md:max-w-[48%] max-w-[90%]">
						<div
							className={`p-5 dir-ltr rounded-3xl ${
								isCurrentUserMessage(message.userId)
									? "bg-green-600 rounded-tr-none"
									: "bg-gray-600 rounded-tl-none"
							}`}
						>
							{message.message}
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default RenderChats;
