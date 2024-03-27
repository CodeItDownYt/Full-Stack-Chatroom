import { RouteObject } from "react-router";
import Layout from "../layout";
import Home from "../pages/Home";
import Room from "../pages/Room";

const routes: RouteObject[] = [
	{
		path: "/",
		element: <Layout />,
		children: [
			{ path: "", element: <Home /> },
			{ path: "room/:roomId", element: <Room /> },
		],
	},
];

export default routes;
