import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";
import bg from "../assets/images/bgfull.png";

const Layout = () => {
	return (
		<>
			<Sidebar />
			<div
				className="md:ml-[370px] ml-[80px] bg-center bg-cover h-screen relative"
				style={{ backgroundImage: `url(${bg})` }}
			>
				<div className="absolute w-full h-full bg-black opacity-10 left-0 top-0 z-10"></div>
				<div className="absolute z-50 w-full h-full">
					<Outlet />
				</div>
			</div>
		</>
	);
};

export default Layout;
