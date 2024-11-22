// import { useState } from "react";
// import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import Sidebar from "@commons/sidebar";
import Navbar from "@commons/navbar";
import ChatPage from "./pages/chat";

import {
	createRoutesFromElements,
	createBrowserRouter,
	RouterProvider,
	Route,
	// Link,
	Outlet,
	Navigate,
	useNavigate,
} from "react-router-dom";

import { InitializeHelper } from "./commons/initialize_helper";

import SettingsPage from "./pages/settings";
import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { xapikeyAtom } from "./stores/jotai/x_api_key";
import { store } from "./stores/store_helper";

import { XAIModelsPage } from "./pages/xAI/models";

function App() {
	// const [greetMsg, setGreetMsg] = useState("");
	// const [name, setName] = useState("");

	// async function greet() {
	// 	// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
	// 	setGreetMsg(await invoke("greet", { name }));
	// }

	// 		{/* <form
	// 	className="row"
	// 	onSubmit={(e) => {
	// 		e.preventDefault();
	// 		greet();
	// 	}}
	// >
	// 	<input
	// 		id="greet-input"
	// 		onChange={(e) => setName(e.currentTarget.value)}
	// 		placeholder="Enter a name..."
	// 	/>
	// 	<button type="submit">Greet</button>
	// </form>
	// <p>{greetMsg}</p> */}

	// const setXAPIKeyAtom = useSetAtom(xapikeyAtom);

	// const navigate = useNavigate();

	// useEffect(() => {
	// 	AttemptToGetXAPIKey();
	// }, []);

	// async function AttemptToGetXAPIKey() {
	// 	const X_API_KEY = "x-api-key";

	// 	const val = await store.get<string>(X_API_KEY);
	// 	if (val === undefined || val === null) {
	// 		//
	// 		("/settings");
	// 	} else {
	// 		setXAPIKeyAtom(val);
	// 	}
	// }

	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route
				path="/"
				element={
					<>
						<InitializeHelper />

						<Navbar />

						<Navigate
							to="/chat?chat_id=-1"
							replace
						/>

						<div
							style={{
								paddingTop: "36px",
								height: "calc(100vh - 36px)",
								display: "flex",
							}}
						>
							<Sidebar />

							<div
								style={{
									width: "calc(100vw - 320px)",
									height: "calc(100%)",
								}}
							>
								<Outlet />
							</div>
						</div>
					</>
				}
			>
				<Route
					index
					path="/chat"
					element={<ChatPage />}
				/>

				<Route
					path="/settings"
					element={<SettingsPage />}
				/>

				<Route
					path="/xAI/models"
					element={<XAIModelsPage />}
				/>

				<Route
					path="*"
					element={
						<div
							style={{
								display: "flex",
								placeItems: "center",
								height: "100%",
								justifyContent: "center",
								fontSize: "2rem",
								fontWeight: "bold",
							}}
						>
							Not Found
						</div>
					}
				/>
			</Route>,
		),
	);

	return (
		<div
			style={{
				backgroundColor: "var(--color-bg)",
			}}
		>
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
