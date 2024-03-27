import { ChatbubbleOutline, NotificationsOutline, PersonOutline } from "react-ionicons";

interface Props {
	roomTitle: string;
}

const RoomNavbar = ({ roomTitle }: Props) => {
	return (
		<div className="w-full absolute top-0 flex items-center justify-between px-5 h-[80px] bg-[#0b1419] border-b border-[#262730]">
			<span className="font-medium text-xl">{roomTitle}</span>
			<div className="flex items-center gap-4">
				<PersonOutline
					color={"#fff"}
					cssClasses={"cursor-pointer"}
				/>
				<NotificationsOutline
					color={"#fff"}
					cssClasses={"cursor-pointer"}
				/>
				<ChatbubbleOutline
					color={"#fff"}
					cssClasses={"cursor-pointer"}
				/>
			</div>
		</div>
	);
};

export default RoomNavbar;
