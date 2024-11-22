import { useAtom, useAtomValue } from "jotai";
import UserInputArea from "./user_input_area";
// import * as stylex from "@stylexjs/stylex";
// import { xAiModelsAtom } from "@src/stores/jotai/x_models";
import {
	useEffect,
	// useLayoutEffect,
	useRef,
	useState
} from "react";
import { xapikeyAtom } from "@src/stores/jotai/x_api_key";
import { Editor } from "./display_text_block";
import {
	// replace,
	useBlocker,
	// useLocation,
	useNavigate,
	useSearchParams
} from "react-router-dom";
import { sqlite_db } from "@src/stores/sqlite";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	// AlertDialogTrigger,
	Button,
	ButtonVariants,
	H5,
	Lozenge,
} from "@controlkit/ui";
import { chatsAtom, type T_Chat } from "@src/stores/jotai/chats";

// const styles = stylex.create({
// 	prompt_card: {
// 		border: "1px solid var(--border-color)",
// 		width: "10rem",
// 		fontSize: "0.875rem",
// 		fontWeight: "bold",
// 		padding: "0.5rem",
// 		height: "6rem",
// 		display: "flex",
// 		flexDirection: "column",

// 		cursor: "pointer",

// 		transition: "background-color var(--transition-speed) ease",

// 		":hover": {
// 			backgroundColor: "var(--color-bg-compliment)",
// 		},
// 	},
// });

type T_ChatMeta = {
	id: number;
	title: string;
	model: string;
	updated_at: number;
	created_at: number;
};

export default function ChatPage() {
	const [chats, setChats] = useAtom<T_Chat[]>(chatsAtom);

	// const xAiModels = useAtomValue(xAiModelsAtom);
	const x_api_key = useAtomValue(xapikeyAtom);

	const navigate = useNavigate();

	const [text, setText] = useState<string>("");
	const [inProgres, setInProgress] = useState<boolean>(false);

	const blocker = useBlocker(() => inProgres === true);

	const [chatMeta, setChatMeta] = useState<T_ChatMeta>({
		id: -1,
		title: "New Chat",
		model: "grok-beta",
		updated_at: Date.now(),
		created_at: Date.now(),
	});
	const chatID = useRef<number>(-1);

	const [chatMessages, setChatMessages] = useState<any[]>([]);

	const [searchParams] = useSearchParams();
	useEffect(() => {
		// HACK: clean this up later
		setTimeout(() => {
			const el = document.getElementById("chat-area");
			if(el) {
				el.scrollTo(999999999999, 999999999999);
			}
		}, 50);

		AttemptToFetchChatHistory();
	}, [searchParams]);

	async function AttemptToFetchChatHistory() {
		const chat_id = searchParams.get("chat_id");

		console.log("Here -- Chat ID - ", chat_id);

		if (chat_id === "-1") {
			chatID.current = -1;

			setChatMeta({
				id: -1,
				title: "New Chat",
				model: "grok-beta",
				updated_at: Date.now(),
				created_at: Date.now(),
			});

			setText("");
			setChatMessages([]);
			setInProgress(false);
			// new chat
			// console.log("Chat is -1");
			// leave chat meta as null
		} else if (chat_id !== null && chat_id !== "-1") {
			chatID.current = Number.parseInt(chat_id);
			// attempt to find chat and chat history from sqlite db
			const vals = await sqlite_db.select(
				`SELECT * FROM chats WHERE id = ${chatID.current};`,
			);
			console.log(vals);
			setChatMeta((vals as T_ChatMeta[])[0]);

			const valz = await sqlite_db.select(
				`SELECT * FROM chat_messages WHERE chat_id = ${chatID.current};`,
			);
			console.log("Chatr messages - ", valz);
			setChatMessages(valz as any);
		}

		console.log("Chat id || ", chat_id);
	}

	// CREATE TABLE chats (
	// 	id INTEGER PRIMARY KEY,
	//
	// 	title TEXT,
	// 	model TEXT,
	//
	// 	updated_at INTEGER,
	// 	created_at INTEGER
	// );

	// const [chatText, setChatText] = useState<string>("");
	// 	const [chatText, setChatText] = useState<string>(
	// ", and print the lists to the console. Then, print a statement that says \"Hello, World!\" - Paul\n\nHere's a Python script that meets your requirements:\n\n```python\n# Define two short lists\nfruits = [\"Apple\", \"Banana\", \"Cherry\"]\ncolors = [\"Red\", \"Green\", \"Blue\"]\n\n# Print headings and lists\nprint(\"Fruits:\")\nprint(fruits)\n\nprint(\"\\nColors:\")\nprint(colors)\n\n# Print the greeting\nprint(\"\\nHello, World!\")\n```\n\nThis script:\n\n1. Creates two lists, `fruits` and `colors`, each containing three items.\n2. Prints these lists with their respective headings.\n3. Finally, prints the \"Hello, World!\" statement.\n\nThe script adheres to the line limit you specified by being concise with its operations and spacing.<|eos|>"
	// );

	const [chatText, setChatText] = useState<string>(
		"", // 'Then write a short 4 line poem. Then write a 5 item shopping list. Lastly write a short story about a knight and a dragon.\n\nHere\'s your request fulfilled:\n\n### JavaScript File (10 lines)\n```javascript\n// A simple function to reverse a string\nfunction reverseString(str) {\n    let newString = "";\n    for (let i = str.length - 1; i >= 0; i--) {\n        newString += str[i];\n    }\n    return newString;\n}\n\nconst greeting = "Hello, World!";\nconsole.log(reverseString(greeting));\n```\n\n### C++ File (10 lines)\n```cpp\n#include <iostream>\nusing namespace std;\n\n// A function to sum two numbers\nint sum(int a, int b) {\n    return a + b;\n}\n\nint main() {\n    cout << "The sum of 5 and 3 is: " << sum(5, 3) << endl;\n    return 0;\n}\n```\n\n### Bullet Point List with Sub-items\n- **Cooking**\n  - Ingredients\n  - Recipes\n- **Gardening**\n  - Tools\n  - Plants\n- **Fitness**\n  - Exercises\n  - Nutrition\n\n### Short 4 Line Poem\nIn the sky, the stars do glow,\nWith each twinkle, they seem to grow,\nA universe of stories untold,\nIn the silence, they unfold.\n\n### 5 Item Shopping List\n- Milk\n- Eggs\n- Bread\n- Apples\n- Spinach\n\n### Short Story: The Knight and the Dragon\n\nOnce upon a time, in a kingdom far away, lived Sir Alaric, a brave knight known for his valor and kindness. One fateful day, a dragon named Ember, with scales of shimmering gold, started causing havoc in the kingdom, not out of malice but in search of a long-lost treasure that belonged to his kin.\n\nSir Alaric, instead of rushing into battle with sword drawn, approached the dragon with an offer of peace. He learned of Ember\'s plight and decided to help retrieve the treasure, which was hidden deep within the treacherous mountain caves. Together, they navigated the dark tunnels, facing traps and puzzles that had been set by ancient guardians.\n\nAfter many trials, they uncovered the treasure, not just of gold, but of ancient knowledge and artifacts. Ember, touched by Alaric\'s kindness, vowed never to harm the kingdom again. Instead, he became its protector, and Alaric, now an old friend, would often visit, sharing tales by the firelight of their adventure, teaching the village children about courage, friendship, and understanding. Thus, a bond was forged, not of steel, but of trust, turning a feared adversary into a cherished ally. The table should be about top movies of 2023.\n\nHere are the top movies of 2023:\n\n| Rank | Title                 | Director                 | Genre                  | Box Office (Worldwide) |\n|------|-----------------------|--------------------------|------------------------|-------------------------|\n| 1    | **Oppenheimer**       | Christopher Nolan        | Biography, Drama       | $952M                   |\n| 2    | **Barbie**            | Greta Gerwig             | Comedy, Fantasy        | $1.446B                 |\n| 3    | **The Super Mario Bros. Movie** | Aaron Horvath, Michael Jelenic | Animation, Adventure | $1.36B                  |\n| 4    | **Spider-Man: Across the Spider-Verse** | Joaquim Dos Santos, Kemp Powers, Justin K. Thompson | Animation, Action | $690.5M                 |\n| 5    | **Guardians of the Galaxy Vol. 3** | James Gunn        | Sci-Fi, Action         | $845.6M                 |<|eos|>',
	);

	const chatStreamRef = useRef<string>("");

	// const [test, setTest] = useState<string>(`
	// 	Here's a simple "Hello, World!" function in Python: \n\n\`\`\`python\n\n def hello_world(): \n\n\t""" Prints 'Hello, World!' to the console. This function demonstrates the basic structure of a Python function. """ print("Hello, World!") # Call the function to see the output hello_world() \`\`\` This function: - Defines a function named \`hello_world\` with no parameters. - Includes a docstring explaining what the function does. - Uses the \`print()\` function to output the string "Hello, World!". - The function is then called at the end of the script to demonstrate its use. You can run this script, and it will display "Hello, World!" in the console. Remember, in Python, indentation is crucial for defining the structure, so make sure the \`print\` statement is properly indented under the function definition.<|eos|>`);

	// TODO: move this out to a web worker or manager so navigation to different chats is possible without interrupting generation and saving to sqlite
	async function AttemptToGetChatCompeltion() {
		// const response = await fetch("https://api.x.ai/v1/completions", {

		// debugger;

		const new_message_plus_history_context = [];
		new_message_plus_history_context.push({
			role: "system",
			content: "You are Grok, a chatbot inspired by the Hitchhikers Guide to the Galaxy.",
		});

		// TODO: add options to control amount of chat history sent back as context

		const chat_history_ns = [...chatMessages];
		for (let i = 0; i < chat_history_ns.length; ++i) {
			new_message_plus_history_context.push({
				role: chat_history_ns[i].role,
				content: JSON.parse(chat_history_ns[i].choices).content,
			});
		}

		new_message_plus_history_context.push({
			role: "user",
			content: text,
		});

		const response = await fetch("https://api.x.ai/v1/chat/completions", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${x_api_key}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				model: "grok-beta",
				stream: true,
				messages: new_message_plus_history_context,
				// [
				// 	{
				// 		role: "system",
				// 		content:
				// 			"You are Grok, a chatbot inspired by the Hitchhikers Guide to the Galaxy.",
				// 	},
				// 	{ role: "user", content: text },
				// ],
			}),
		});

		// console.log(response);

		const reader = response.body?.pipeThrough(new TextDecoderStream()).getReader();
		if (!reader) return;
		// eslint-disable-next-line no-constant-condition

		if (chatMeta.id === -1) {
			const dn = Date.now();

			const result = await sqlite_db.execute(
				`
				INSERT INTO chats (title, model, updated_at, created_at)
				VALUES ($1, $2, $3, $4)
				RETURNING id;
				`,
				[text, "grok-beta", dn, dn],
			);

			console.log("DB Result Insert Chat - ", result);

			chatID.current = result.lastInsertId;

			setChatMeta({
				id: result.lastInsertId,
				title: text,
				model: "grok-beta",
				updated_at: dn,
				created_at: dn,
			});

			const ns_chats = [...chats];
			ns_chats.push({
				id: result.lastInsertId,
				title: text,
				model: "grok-beta",
				updated_at: dn,
				created_at: dn,
			});
			setChats(ns_chats);

			// TODO: update history without trigger render in the future when adding back and forward navigation options to navbar
			navigate(`/chat?chat_id=${result.lastInsertId}`, { replace: true });
		}

		setInProgress(true);
		chatStreamRef.current = "";

		// if chatID.current === -1 display some kind of error

		const dn = Date.now();
		const result = await sqlite_db.execute(
			`
			INSERT INTO chat_messages (chat_id, model, role, choices, usage, created_at)
			VALUES ($1, $2, $3, $4, $5, $6)
			RETURNING id;
			`,
			[chatID.current, "grok-beta", "user", JSON.stringify({ content: text }), null, dn],
		);
		console.log("DB Result Insert Chat Message User - ", result);
		// console.log(res);

		const ns = [...chatMessages];
		ns.push({
			chat_id: chatID.current,
			model: "grok-beta",
			role: "user",
			choices: JSON.stringify({ content: text }),
			usage: null,
			created_at: dn,
		});
		setChatMessages(ns);

		// CREATE TABLE chat_messages (
		// 	id TEXT PRIMARY KEY,
		// 	chat_id INTEGER,
		// 	model TEXT,
		// 	role TEXT,
		// 	choices BLOB,
		// 	usage BLOB,
		// 	created_at INTEGER,
		// 	FOREIGN KEY(chat_id) REFERENCES chats(id)
		// );

		while (true) {
			// eslint-disable-next-line no-await-in-loop
			const { value, done } = await reader.read();
			if (done) break;

			let dataDone = false;
			let finish_reason = "";
			let usage = null;

			const arr = value.split("\n");
			arr.forEach((data) => {
				if (data.length === 0) return; // ignore empty message
				if (data.startsWith(":")) return; // ignore sse comment message
				if (data === "data: [DONE]") {
					dataDone = true;
					return;
				}
				const json = JSON.parse(data.substring(6));
				console.log(json);

				if (json.choices[0].delta.hasOwnProperty("content")) {
					chatStreamRef.current += json.choices[0].delta.content;
					setChatText(chatStreamRef.current);
				}

				if (json.choices[0].hasOwnProperty("finish_reason")) {
					finish_reason = json.choices[0].finish_reason;
					usage = JSON.stringify(json.usage);
				}
			});

			if (dataDone) {
				const dn = Date.now();
				const result = await sqlite_db.execute(
					`
					INSERT INTO chat_messages (chat_id, model, role, choices, usage, created_at)
					VALUES ($1, $2, $3, $4, $5, $6)
					RETURNING id;
					`,
					[
						chatID.current,
						"grok-beta",
						"assistant",
						JSON.stringify({
							content: chatStreamRef.current,
							finish_reason: finish_reason,
						}),
						usage,
						dn,
					],
				);
				console.log("DB Result Insert Chat Message Assistant - ", result);

				ns.push({
					chat_id: chatID.current,
					model: "grok-beta",
					role: "assistant",
					choices: JSON.stringify({
						content: chatStreamRef.current,
						finish_reason: finish_reason,
					}),
					usage: usage,
					created_at: dn,
				});
				setChatMessages(ns);

				break;
			}
		}

		chatStreamRef.current = "";
		setInProgress(false);

		setChatText("");
	}

	// TODO: prompt completions
	// async function AttemptToGetCompeltion() {
		// // prompt completiions
		// const response = await fetch("https://api.x.ai/v1/completions", {
		// 	method: "POST",
		// 	headers: {
		// 		Authorization: `Bearer ${x_api_key}`,
		// 		"Content-Type": "application/json",
		// 	},
		// 	body: JSON.stringify({
		// 		model: "grok-beta",
		// 		prompt: text,
		// 		stream: true,
		// 	}),
		// });
		// console.log(response);
		// const reader = response.body?.pipeThrough(new TextDecoderStream()).getReader();
		// if (!reader) return;
		// // eslint-disable-next-line no-constant-condition
		// chatStreamRef.current = "";
		// while (true) {
		// 	// eslint-disable-next-line no-await-in-loop
		// 	const { value, done } = await reader.read();
		// 	if (done) break;
		// 	let dataDone = false;
		// 	let finish_reason = "";
		// 	let usage = null;
		// 	const arr = value.split("\n");
		// 	arr.forEach((data) => {
		// 		if (data.length === 0) return; // ignore empty message
		// 		if (data.startsWith(":")) return; // ignore sse comment message
		// 		if (|| data === "data: [DONE]") {
		// 			const json = JSON.parse(data.substring(6));
		// 			dataDone = true;
		// 			finish_reason = json.choices[0].finish_reason;
		// 			usage = JSON.stringify(json.usage);
		// 			return;
		// 		}
		// 		// const json = JSON.parse(data.substring(6));
		// 		console.log(json);
		// data === "<|eos|>" check
		// 		chatStreamRef.current += json.choices[0].text;
		// 		setChatText(chatStreamRef.current);
		// 	});
		// 	if (dataDone) {
		// 		const dn = Date.now();
		// 		const result = await sqlite_db.execute(
		// 			`
		// 			INSERT INTO chat_messages (chat_id, model, role, choices, usage, created_at)
		// 			VALUES ($1, $2, $3, $4, $5, $6)
		// 			RETURNING id;
		// 			`,
		// 			[
		// 				chatID.current,
		// 				"grok-beta",
		// 				"assistant",
		// 				JSON.stringify({
		// 					message: chatStreamRef.current,
		// 					finish_reason: finish_reason,
		// 				}),
		// 				usage,
		// 				dn,
		// 			],
		// 		);
		// 		break;
		// 	}
		// }
		// chatStreamRef.current = "";
	// }

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				height: "100%",
			}}
		>
			<div
				style={{
					borderBottom: "1px solid var(--border-color)",
					height: "4.5rem",
				}}
			>
				<div
					style={{
						display: "flex",
						padding: "0.5rem",
					}}
				>
					<div>
						<div
							style={{
								fontWeight: "bold",
							}}
						>
							{chatMeta.title}
						</div>
						<Lozenge
							style={{
								marginTop: "0.5rem",
							}}
						>
							grok-beta
						</Lozenge>

						{/* Model: */}
						{/* {JSON.stringify(xAiModels)} */}
						{/* {xAiModels !== null && (
							<div>
								{xAiModels.language_models.map((model: any) => {
									return <div key={model.model}>{model.model}</div>;
								})}
							</div>
						)} */}
					</div>
				</div>
			</div>

			<div
				id="chat-area"
				style={{
					height: "100%",
					overflowY: "auto",
				}}
			>
				<div
					style={{
						padding: "1rem 0",
						width: "100%",
						maxWidth: "760px",
						display: "grid",
						justifySelf: "center",
					}}
				>
					{/* {JSON.stringify(blocker)} */}
					{blocker.state === "blocked" && (
						<AlertDialog open={true}>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle asChild>
										<H5>{"Chat generation hasn't completed"}</H5>
									</AlertDialogTitle>
									<AlertDialogDescription>
										<br />
										If you leave this page before the response finishes, the
										response won't be saved.
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel>
										<Button
											variant={ButtonVariants.ACTION}
											onClick={() => blocker.reset()}
										>
											Cancel
										</Button>
									</AlertDialogCancel>
									<AlertDialogAction>
										<Button
											variant={ButtonVariants.DANGER}
											onClick={() => blocker.proceed()}
										>
											Leave
										</Button>
									</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
						// <div>
						// 	<p></p>
						// 	<button onClick={() => blocker.proceed()}>Proceed</button>
						// 	<button onClick={() => blocker.reset()}>Cancel</button>
						// </div>
					)}

					{/* <div
					style={{
						height: "100%",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						flexDirection: "column",
					}}
				>
					<h1>Hi there,</h1>
					<h1>What would you like to know?</h1>

					<br />
					<p>Use one of the most common prompts below or use your own to begin</p>
					<br />

					<div
						style={{
							display: "flex",
							gap: "1rem",
							flexWrap: "wrap",
						}}
					>
						<PromptCard prompt="Write a to-do list for a personal project or task?" />
						<PromptCard prompt="Generate an email reply to a job offer?" />
						<PromptCard prompt="Summarize this article or text for me in one paragraph?" />
						<PromptCard prompt="How does AI work in a technical capacity?" />
					</div>

					<br />
					<p>Refresh Prompts BTN</p>
				</div> */}

					{chatMessages.map((message) => {
						return (
							<div key={message.id}>
								<div
									style={{
										padding: "0 1rem",
										display: "flex",
										justifyContent: message.role === "user" ? "flex-end" : "",
										alignItems: "center",
									}}
								>
									{message.role !== "user" && (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 1000 1000"
											width="24"
											height="24"
										>
											<g>
												<polygon
													fill="#fff"
													points="226.83 411.15 501.31 803.15 623.31 803.15 348.82 411.15 226.83 411.15"
												></polygon>
												<polygon
													fill="#fff"
													points="348.72 628.87 226.69 803.15 348.77 803.15 409.76 716.05 348.72 628.87"
												></polygon>
												<polygon
													fill="#fff"
													points="651.23 196.85 440.28 498.12 501.32 585.29 773.31 196.85 651.23 196.85"
												></polygon>
												<polygon
													fill="#fff"
													points="673.31 383.25 673.31 803.15 773.31 803.15 773.31 240.44 673.31 383.25"
												></polygon>
											</g>
										</svg>
									)}

									{message.role === "user" ? "You" : " - Grok"}
								</div>

								<Editor value={JSON.parse(message.choices).content} />
							</div>
						);
					})}

					{chatText !== "" && (
						<>
							<div
								style={{
									padding: "0 1rem",
									display: "flex",
									alignItems: "center",
								}}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 1000 1000"
									width="24"
									height="24"
								>
									<g>
										<polygon
											fill="#fff"
											points="226.83 411.15 501.31 803.15 623.31 803.15 348.82 411.15 226.83 411.15"
										></polygon>
										<polygon
											fill="#fff"
											points="348.72 628.87 226.69 803.15 348.77 803.15 409.76 716.05 348.72 628.87"
										></polygon>
										<polygon
											fill="#fff"
											points="651.23 196.85 440.28 498.12 501.32 585.29 773.31 196.85 651.23 196.85"
										></polygon>
										<polygon
											fill="#fff"
											points="673.31 383.25 673.31 803.15 773.31 803.15 773.31 240.44 673.31 383.25"
										></polygon>
									</g>
								</svg>

								{" - Grok"}
							</div>

							{/* TODO: maybe convert and use lexical for better flexibility and more customization later */}
							<Editor value={chatText} />
						</>
					)}

					{/* {chatText} */}

					{/* {TODO: need to pretty print some user friendly errorMsgs} */}
				</div>
			</div>

			<UserInputArea
				text={text}
				setText={setText}
				onSubmit={AttemptToGetChatCompeltion}
				inProgress={inProgres}
			/>
		</div>
	);
}

// function PromptCard(props: any) {
// 	return (
// 		<div {...stylex.props(styles.prompt_card)}>
// 			<p>{props.prompt}</p>

// 			<div
// 				style={{
// 					height: "100%",
// 				}}
// 			/>

// 			<p>icon</p>
// 		</div>
// 	);
// }
