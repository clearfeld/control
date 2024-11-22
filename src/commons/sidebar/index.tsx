import { sqlite_db } from "@src/stores/sqlite";
import {
	Button,
	Divider,
	H6,
	LoadingSize,
	LoadingSpinner,
	Lozenge,
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@controlkit/ui";
import * as stylex from "@stylexjs/stylex";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { chatsAtom, type T_Chat } from "@src/stores/jotai/chats";
import { useAtom } from "jotai";

const styles = stylex.create({
	base: {
		height: "100%",
		minWidth: "320px",
		width: "320px",
		maxWidth: "320px",
		backgroundColor: "var(--sidebar-color-bg)",
		borderRight: "1px solid var(--border-color)",
		display: "flex",
	},

	plus_btn: {
		width: "2rem",
		height: "2rem",
		border: "none",
		borderRadius: "0.5rem",
		cursor: "pointer",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "white",
	},

	rail_btn: {
		width: "100%",
		height: "2rem",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		cursor: "pointer",
		transition: "background-color var(--transitoin-speed) ease",

		":hover": {
			backgroundColor: "var(--cds-gray-300)",
			// backgroundColor: "var(--color-bg-compliment)",
		},
	},

	chat_btn: {
		padding: "0.5rem 0.5rem",
		cursor: "pointer",
		borderLeft: "0.25rem solid var(--color-bg-compliment)",

		transition: "background-color var(--transition-speed) ease",

		":hover": {
			backgroundColor: "var(--cds-gray-200)",
		},
	},

	chat_btn_active: {
		borderLeft: "0.25rem solid var(--cds-blue-300)",
		backgroundColor: "var(--color-bg-compliment)",
	},
});

export default function Sidebar() {
	return (
		<div {...stylex.props(styles.base)}>
			<Rail />
			<ChatList />
		</div>
	);
}

function Rail() {
	return (
		<div
			style={{
				width: "3rem",
				display: "flex",
				flexDirection: "column",
				borderRight: "1px solid var(--border-color)",
				alignItems: "center",
				// gap: "1rem",
				boxSizing: "border-box",
				// padding: "1rem",
			}}
		>
			<div
				style={{
					width: "100%",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					// gap: "1rem",
					boxSizing: "border-box",
				}}
			>
				{/* <button
					type="button"
					{...stylex.props(styles.plus_btn)}
				>
					<svg
						width="16"
						height="16"
						viewBox="0 0 16 16"
						fill="none"
					>
						<path
							d="M8 2V14M2 8H14"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
						/>
					</svg>
				</button> */}

				{/* <svg
					width="16"
					height="16"
					viewBox="0 0 16 16"
					fill="none"
				>
					<path
						d="M7 13C10.3137 13 13 10.3137 13 7C13 3.68629 10.3137 1 7 1C3.68629 1 1 3.68629 1 7C1 10.3137 3.68629 13 7 13Z"
						stroke="currentColor"
						strokeWidth="2"
					/>
					<path
						d="M11.5 11.5L15 15"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
					/>
				</svg>

				<svg
					width="16"
					height="16"
					viewBox="0 0 16 16"
					fill="none"
				>
					<path
						d="M1 8L8 2L15 8"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
					/>
					<path
						d="M3 7V14H13V7"
						stroke="currentColor"
						strokeWidth="2"
					/>
				</svg> */}

				{/* <TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link
								to={"/chat?chat_id=-1"}
								style={{
									borderLeft: "0.25rem solid var(--cds-blue-300)",
									background: "var(--cds-gray-200)",

									width: "100%",
									height: "2rem",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<div
									style={{
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										color: "white",
									}}
								>
									<svg
										width="16"
										height="16"
										viewBox="0 0 16 16"
										fill="none"
									>
										<path
											d="M8 1C4.13401 1 1 3.13401 1 6C1 7.82929 2.15554 9.42831 3.85336 10.2495L3 14L6.72318 11.7216C7.13691 11.8037 7.56234 11.8473 8 11.8473C11.866 11.8473 15 9.71329 15 6.84729C15 3.9813 11.866 1 8 1Z"
											stroke="currentColor"
											strokeWidth="2"
										/>
									</svg>
								</div>
							</Link>
						</TooltipTrigger>
						<TooltipContent>
							<span>Chats</span>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider> */}

				{/* <svg
					width="16"
					height="16"
					viewBox="0 0 16 16"
					fill="none"
				>
					<path
						d="M2 2H8L10 4H14C14.5523 4 15 4.44772 15 5V13C15 13.5523 14.5523 14 14 14H2C1.44772 14 1 13.5523 1 13V3C1 2.44772 1.44772 2 2 2Z"
						stroke="currentColor"
						strokeWidth="2"
					/>
				</svg> */}

				{/*

				<svg
					width="16"
					height="16"
					viewBox="0 0 16 16"
					fill="none"
				>
					<path
						d="M2 2H8L10 4H14C14.5523 4 15 4.44772 15 5V13C15 13.5523 14.5523 14 14 14H2C1.44772 14 1 13.5523 1 13V3C1 2.44772 1.44772 2 2 2Z"
						stroke="currentColor"
						strokeWidth="2"
					/>
				</svg>

				<svg
					width="16"
					height="16"
					viewBox="0 0 16 16"
					fill="none"
				>
					<path
						d="M8 4V8L11 11"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
					/>
					<path
						d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z"
						stroke="currentColor"
						strokeWidth="2"
					/>
				</svg> */}
			</div>

			<div
				style={{
					height: "100%",
				}}
			/>

			<div
				style={{
					width: "100%",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: "0.25rem",
					boxSizing: "border-box",
				}}
			>
				<Link
					to="/xAI/models"
					{...stylex.props(styles.rail_btn)}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="white"
						height="20"
						width="20"
					>
						<path d="M14 4.4375C15.3462 4.4375 16.4375 3.34619 16.4375 2H17.5625C17.5625 3.34619 18.6538 4.4375 20 4.4375V5.5625C18.6538 5.5625 17.5625 6.65381 17.5625 8H16.4375C16.4375 6.65381 15.3462 5.5625 14 5.5625V4.4375ZM1 11C4.31371 11 7 8.31371 7 5H9C9 8.31371 11.6863 11 15 11V13C11.6863 13 9 15.6863 9 19H7C7 15.6863 4.31371 13 1 13V11ZM4.87601 12C6.18717 12.7276 7.27243 13.8128 8 15.124 8.72757 13.8128 9.81283 12.7276 11.124 12 9.81283 11.2724 8.72757 10.1872 8 8.87601 7.27243 10.1872 6.18717 11.2724 4.87601 12ZM17.25 14C17.25 15.7949 15.7949 17.25 14 17.25V18.75C15.7949 18.75 17.25 20.2051 17.25 22H18.75C18.75 20.2051 20.2051 18.75 22 18.75V17.25C20.2051 17.25 18.75 15.7949 18.75 14H17.25Z"></path>
					</svg>
				</Link>

				<Link
					to={"/settings"}
					{...stylex.props(styles.rail_btn)}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="20"
						width="20"
						viewBox="0 0 24 24"
						fill="white"
					>
						<path d="M12 1L21.5 6.5V17.5L12 23L2.5 17.5V6.5L12 1ZM12 3.311L4.5 7.65311V16.3469L12 20.689L19.5 16.3469V7.65311L12 3.311ZM12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16ZM12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z"></path>
					</svg>
				</Link>

				{/*
			Bad ai generation
			<svg width="16" height="16" viewBox="0 0 16 16" fill="none"></svg>
				<path d="M6.5 2L7.21 4.43L8.5 3.35L8.62 5.85L10.5 5.5L9.74 7.89L11.5 8.5L9.89 10.11L11.5 11.5L9.11 12.26L9.5 14L7.15 13.38L6.5 15.5L5.85 13.38L3.5 14L3.89 12.26L1.5 11.5L3.11 10.11L1.5 8.5L3.26 7.89L2.5 5.5L4.38 5.85L4.5 3.35L5.79 4.43L6.5 2Z" stroke="currentColor" strokeWidth="2"/>
			</svg> */}

				{/* <svg
					width="16"
					height="16"
					viewBox="0 0 16 16"
					fill="none"
				>
					<circle
						cx="8"
						cy="5"
						r="3"
						stroke="currentColor"
						strokeWidth="2"
					/>
					<path
						d="M2 14C2 11.2386 4.23858 9 7 9H9C11.7614 9 14 11.2386 14 14"
						stroke="currentColor"
						strokeWidth="2"
					/>
				</svg> */}
			</div>
		</div>
	);
}

function ChatList() {
	const [chats, setChats] = useAtom<T_Chat[]>(chatsAtom);
	const [loading, setLoading] = useState(true);

	const [chat_id, setChatId] = useState<number | null>(null);
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		const q = searchParams.get("chat_id");
		if (q !== null) {
			setChatId(Number.parseInt(q));
		}
	}, [searchParams]);

	useEffect(() => {
		AttemptToFetchChats();
	}, []);

	async function AttemptToFetchChats() {
		console.log(sqlite_db);
		const vals = await sqlite_db.select(`SELECT * FROM chats ORDER BY updated_at DESC;`);
		console.log("Chats - ", vals);
		setChats(vals);
		setLoading(false);
	}

	return (
		<div
			style={{
				width: "100%",
			}}
		>
			{/* <div>Search bar</div>
			<Divider /> */}

			<div
				style={{
					display: "grid",
					// gap: "0.5rem",
				}}
			>
				{loading && (
					<div
						style={{
							paddingTop: "1rem",
							placeItems: "center",
						}}
					>
						<LoadingSpinner size={LoadingSize.MEDIUM} />
					</div>
				)}

				{!loading && (
					<div>
						<div
							style={{
								width: "100%",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								marginTop: "0.75rem",
								marginBottom: "0.75rem",
								padding: "0 1rem",
								boxSizing: "border-box",
							}}
						>
							<Link
								to={`/chat?chat_id=-1`}
								style={{
									color: "var(--text-color)",
									textDecoration: "none",
									width: "100%",
								}}
							>
								<Button
									style={{
										width: "100%",
									}}
								>
									New Chat
								</Button>
							</Link>
						</div>

						<Divider />
					</div>
				)}

				{chats.length === 0 && !loading && (
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							marginTop: "1rem",
							color: "var(--text-sub-color)",
							flexDirection: "column",
						}}
					>
						<p>Enter your API key.</p>
						<p>Then start a new chat!</p>
					</div>
				)}

				{!loading &&
					chats.map((chat) => {
						return (
							<Link
								to={`/chat?chat_id=${chat.id}`}
								key={chat.id}
								style={{
									color: "var(--text-color)",
									textDecoration: "none",
								}}
							>
								<div
									{...stylex.props(
										styles.chat_btn,
										chat_id === chat.id && styles.chat_btn_active,
									)}
								>
									<p
										className="text-no-overflow"
										// style=
										style={{
											color: "var(--text-color)",
											textDecoration: "none",
											width: "100%",
											maxWidth: "240px",
										}}
									>
										{chat.title === "" ? "Untitled" : chat.title}
									</p>
									{/* <Lozenge>{chat.model}</Lozenge> */}
								</div>
							</Link>
						);
					})}
			</div>
		</div>
	);
}
