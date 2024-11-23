import { Button } from "@controlkit/ui";
import * as stylex from "@stylexjs/stylex";

import { open } from "@tauri-apps/plugin-dialog";

const styles = stylex.create({
	container: {
		width: "100%",
		boxSizing: "border-box",
		borderTop: "0.0625rem solid var(--border-color)",
		padding: "1rem",
	},
});

export default function UserInputArea(props: any) {
	async function SelectImageFiles(e) {
		const file = await open({
			multiple: false,
			directory: false,
		});
		console.log(file);

		const ns = [...props.attachments];
		ns.push(file);
		props.setAttachments(ns);
	}

	return (
		<div {...stylex.props(styles.container)}>
			<div
				style={{
					display: "flex",
					width: "100%",
				}}
			>
				{/* <div
					style={{
						display: "flex",
						gap: "1rem",
					}}
				>
					<p style={{ textWrap: "nowrap" }}>Model Selector</p>
					<p style={{ textWrap: "nowrap" }}>Upload File or Folder or Image</p>
					<p style={{ textWrap: "nowrap" }}>Knowledge base</p>
					<p style={{ textWrap: "nowrap" }}>Randomness</p>
					<p style={{ textWrap: "nowrap" }}>Limit History</p>
					<p style={{ textWrap: "nowrap" }}>Voice Input</p>
					<p style={{ textWrap: "nowrap" }}>Extensions</p>
					<p style={{ textWrap: "nowrap" }}>Credits Used</p>
				</div>

				<div
					style={{
						width: "100%",
					}}
				/>

				<div
					style={{
						display: "flex",
						gap: "1rem",
					}}
				>
					<p style={{ textWrap: "nowrap" }}>Clear Session</p>
					<p style={{ textWrap: "nowrap" }}>Fullscreen</p>
				</div> */}
			</div>

			<textarea
				name=""
				id=""
				placeholder="Type your message here..."
				style={{
					backgroundColor: "transparent",
					border: "none",
					width: "calc(100% - 0.25rem)",
					resize: "none",
					outline: "none",
					color: "var(--color-text)",
				}}
				value={props.text}
				onChange={(e) => {
					props.setText(e.target.value);
				}}
				onKeyDown={(e) => {
					if (e.key === "Enter" && !e.shiftKey) {
						e.preventDefault();
						props.onSubmit();
					}
				}}
			/>

			<div
				style={{
					display: "flex",
					width: "100%",
				}}
			>
				<div
					style={{
						display: "flex",
						gap: "1rem",
					}}
				>
					{/* <p style={{ textWrap: "nowrap" }}>Add Attachment</p> */}

					<button
						// style={ textWrap: "nowrap" }
						onClick={SelectImageFiles}
					>
						Add Image
					</button>

					{props.attachments.map((attachment, index) => {
						return (
							<div key={attachment}>
								<p>{attachment.substr(attachment.lastIndexOf("\\") + 1)}</p>
							</div>
						);
					})}
				</div>

				<div
					style={{
						width: "100%",
					}}
				/>

				<div
					style={{
						display: "flex",
						gap: "1rem",
					}}
				>
					<Button
						style={{ textWrap: "nowrap" }}
						onClick={props.onSubmit}
						loading={props.inProgress}
					>
						Send
					</Button>
				</div>
			</div>
		</div>
	);
}
