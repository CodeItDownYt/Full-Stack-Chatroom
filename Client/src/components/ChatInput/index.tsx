/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useParams } from "react-router";
import { io } from "socket.io-client";

const ChatInput = () => {
	const params = useParams();
	const [message, setMessage] = useState("");
	const roomId = params.roomId || "0";

	const handleChange = (e: any) => {
		setMessage(e.target.value);
	};

	const handleSubmit = () => {
		if (message.trim() !== "") {
			const userId = localStorage.getItem("userId") || "";
			const socket = io("http://localhost:5000");
			socket.emit("message", { roomId, userId, message });
			setMessage("");
		}
	};

	return (
		<div className="w-full absolute bottom-8">
			<div className="w-full flex items-center gap-5 px-5">
				<input
					type="text"
					className="w-full bg-gray-300 border border-[#262730] rounded-lg px-4 py-3 outline-none placeholder:text-black text-black"
					placeholder="Message ..."
					value={message}
					onChange={handleChange}
					onKeyDown={(e: any) => e.key === "Enter" && handleSubmit()}
				/>
				<button
					className="bg-green-700 px-6 py-3 rounded-lg"
					onClick={handleSubmit}
				>
					Send
				</button>
			</div>
		</div>
	);
};

export default ChatInput;
