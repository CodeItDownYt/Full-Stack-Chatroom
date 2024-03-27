import api from "./api";

export const AddRoom = async (title: string, description: string, image: string) =>
	await api.post("rooms", { title, description, image });

export const GetRooms = async () => await api.get("rooms");

export const GetRoomTitle = async (roomId: string) => await api.get(`rooms/${roomId}`);

export const GetRoomMessages = async (roomId: string) => await api.get(`rooms/${roomId}/messages`);
