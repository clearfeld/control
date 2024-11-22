import {
	Divider,
	H1,
	// H2,
	// H3,
	H4,
	H5,
	LoadingSpinner,
	Lozenge,
} from "@controlkit/ui";
import { xapikeyAtom } from "@src/stores/jotai/x_api_key";
import { type T_XAILanguageModel, xAiModelsAtom } from "@src/stores/jotai/x_models";
import * as stylex from "@stylexjs/stylex";
import axios from "axios";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState } from "react";

const styles = stylex.create({
	base: {
		height: "100%",
		padding: "1rem",
		boxSizing: "border-box",
		overflowY: "auto",
	},
});

export function XAIModelsPage() {
	const XAPIKeyAtom = useAtomValue(xapikeyAtom);
	const setXAiModels = useSetAtom(xAiModelsAtom);

	const [isFetching, setIsFetching] = useState<boolean>(true);

	const [languageModels, setLanguageModels] = useState<any[] | null>([
		// {
		// 	id: "grok-beta",
		// 	fingerprint: "fp_6ca29cf396",
		// 	created: 1727136000,
		// 	object: "model",
		// 	owned_by: "xai",
		// 	version: "1.0.0",
		// 	input_modalities: ["text"],
		// 	output_modalities: ["text"],
		// 	prompt_text_token_price: 50000,
		// 	prompt_image_token_price: 0,
		// 	completion_text_token_price: 150000,
		// },
		// {
		// 	id: "grok-vision-beta",
		// 	fingerprint: "fp_5f798fca3b",
		// 	created: 1730764800,
		// 	object: "model",
		// 	owned_by: "xai",
		// 	version: "0.1.0",
		// 	input_modalities: ["text", "image"],
		// 	output_modalities: ["text"],
		// 	prompt_text_token_price: 50000,
		// 	prompt_image_token_price: 100000,
		// 	completion_text_token_price: 150000,
		// },
	]);

	// const [
	// 	embeddingModels,
	// 	setEmbeddingModels,
	// ] = useState<any[] | null>(null);

	useEffect(() => {
		if (languageModels !== null) {
			const ns: T_XAILanguageModel[] = [];
			for (const model of languageModels) {
				ns.push({
					model: model.id,
					input_modalities: [...model.input_modalities],
					output_modalities: [...model.output_modalities],
				});
			}
			setXAiModels({
				// @ts-ignore
				language_models: ns,
			});
		}

		AttemptToGetLanguageModels();
		// AttemptToGeModels();
		// NOTE: Nothing to display yet need to setup create embedding first
		// AttemptToGetEmbeddingModels();
	}, []);

	// function AttemptToGeModels() {
	// 	const headers = {
	// 		Authorization: `Bearer ${XAPIKeyAtom}`,
	// 	};

	// 	axios
	// 		.get("https://api.x.ai/v1/models", { headers })
	// 		.then((res) => {
	// 			console.log("Models - ", res.data);
	// 			// setLanguageModels(res.data);
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// }

	function AttemptToGetLanguageModels() {
		const headers = {
			Authorization: `Bearer ${XAPIKeyAtom}`,
		};

		axios
			.get("https://api.x.ai/v1/language-models", { headers })
			.then((res) => {
				console.log("Language Models - ", res.data);
				setLanguageModels(res.data.models);
				const ns: T_XAILanguageModel[] = [];
				for (const model of res.data.models) {
					ns.push({
						model: model.id,
						input_modalities: [...model.input_modalities],
						output_modalities: [...model.output_modalities],
					});
				}
				setXAiModels({
					// @ts-ignore
					language_models: ns,
				});

				setIsFetching(false);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	// function AttemptToGetEmbeddingModels() {
	// 	const headers = {
	// 		Authorization: `Bearer ${XAPIKeyAtom}`,
	// 	};

	// 	axios
	// 		.get("https://api.x.ai/v1/embedding-models", { headers })
	// 		.then((res) => {
	// 			console.log("Embedding Models - ", res.data);
	// 			setEmbeddingModels(res.data);
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// }

	return (
		<div {...stylex.props(styles.base)}>
			<H1>xAI Models</H1>
			<Divider
				style={{
					marginTop: "0.5rem",
				}}
			/>

			<br />
			<H4>Language Models</H4>
			<br />

			{isFetching && (
				<div>
					<LoadingSpinner />
				</div>
			)}

			{languageModels != null && (
				<div
					style={{
						display: "grid",
						gap: "1rem",
						gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
					}}
				>
					{languageModels.map((model) => {
						return (
							<DisplayLanguageModelCard
								key={model.id}
								model={model}
							/>
						);
					})}
				</div>
			)}
		</div>
	);
}

const styles_card = stylex.create({
	base: {
		border: "1px solid var(--border-color)",
		borderRadius: "0.5rem",
		padding: "0.5rem",
		backgroundColor: "var(--color-bg-compliment)",
	},

	modalities_wrap: {
		display: "flex",
		gap: "1rem",
		padding: "0.5rem 0",
	},
});

function DisplayLanguageModelCard(props: { model: any }) {
	return (
		<div {...stylex.props(styles_card.base)}>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "1fr auto",
					alignItems: "center",
				}}
			>
				<H5>{props.model.id}</H5>
				<Lozenge>{props.model.version}</Lozenge>
			</div>

			<br />

			<div>
				<p>Input Modalities</p>

				<div {...stylex.props(styles_card.modalities_wrap)}>
					{props.model.input_modalities.map((modality: string) => {
						return <Lozenge>{modality}</Lozenge>;
					})}
				</div>
			</div>

			<div>
				<p>Output Modalities</p>

				<div {...stylex.props(styles_card.modalities_wrap)}>
					{props.model.output_modalities.map((modality: string) => {
						return <Lozenge>{modality}</Lozenge>;
					})}
				</div>
			</div>
		</div>
	);
}
