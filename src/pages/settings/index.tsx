import * as stylex from "@stylexjs/stylex";

import { getVersion } from "@tauri-apps/api/app";

import { Button, Divider, H1, Input, Label, Lozenge } from "@controlkit/ui";
import { useEffect, useState } from "react";
import { store } from "@src/stores/store_helper";
import { xapikeyAtom } from "@src/stores/jotai/x_api_key";
import { useSetAtom } from "jotai";

const X_API_KEY = "x-api-key";

const styles = stylex.create({
	base: {
		height: "100%",
		padding: "1rem",
		boxSizing: "border-box",
		overflowY: "auto",
	},
});

const appVersion = await getVersion();

export default function SettingsPage() {
	const setXAPIKeyAtom = useSetAtom(xapikeyAtom);
	const [xaikey, setXAIKey] = useState<string>("");

	useEffect(() => {
		AttemptToGetXAPIKey();
	}, []);

	async function AttemptToGetXAPIKey() {
		const val = await store.get<string>(X_API_KEY);
		if (val === undefined || val === null) {
			//
		} else {
			setXAIKey(val);
			setXAPIKeyAtom(val);
		}
	}

	async function OnSave() {
		await store.set(X_API_KEY, xaikey);
		setXAPIKeyAtom(xaikey);
		await store.save();
	}

	return (
		<div {...stylex.props(styles.base)}>
			<H1>Settings</H1>

			<Divider
				style={{
					marginTop: "0.5rem",
				}}
			/>
			<br />

			<div>
				<Label>App Version</Label>
				<Lozenge
					style={{
						marginTop: "0.5rem",
					}}
				>
					{appVersion}
				</Lozenge>
			</div>

			<br />

			<div>
				<Label>xAI API Key</Label>
				<Input
					// type={}
					onChange={(e) => setXAIKey(e.currentTarget.value)}
					value={xaikey}
					style={{
						marginTop: "0.5rem",
					}}
				/>
			</div>

			<br />

			<Button onClick={OnSave}>Save</Button>
		</div>
	);
}
