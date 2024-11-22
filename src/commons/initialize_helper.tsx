import { xapikeyAtom } from "@src/stores/jotai/x_api_key";
import { T_XAILanguageModel, xAiModelsAtom } from "@src/stores/jotai/x_models";
import { store } from "@src/stores/store_helper";
import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function InitializeHelper() {
	const setXAPIKeyAtom = useSetAtom(xapikeyAtom);

	const navigate = useNavigate();

	useEffect(() => {
		AttemptToGetXAPIKey();
	}, []);

	async function AttemptToGetXAPIKey() {
		const X_API_KEY = "x-api-key";

		const val = await store.get<string>(X_API_KEY);
		if (val === undefined || val === null) {
			//
			navigate("/settings");
		} else {
			setXAPIKeyAtom(val);
		}
	}


	///


	const setXAiModels = useSetAtom(xAiModelsAtom);

    const languageModels = [
		{
			id: "grok-beta",
			fingerprint: "fp_6ca29cf396",
			created: 1727136000,
			object: "model",
			owned_by: "xai",
			version: "1.0.0",
			input_modalities: ["text"],
			output_modalities: ["text"],
			prompt_text_token_price: 50000,
			prompt_image_token_price: 0,
			completion_text_token_price: 150000,
		},
		{
			id: "grok-vision-beta",
			fingerprint: "fp_5f798fca3b",
			created: 1730764800,
			object: "model",
			owned_by: "xai",
			version: "0.1.0",
			input_modalities: ["text", "image"],
			output_modalities: ["text"],
			prompt_text_token_price: 50000,
			prompt_image_token_price: 100000,
			completion_text_token_price: 150000,
		},
	];

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

		// AttemptToGetLanguageModels();
		// AttemptToGeModels();
		// NOTE: Nothing to display yet need to setup create embedding first
		// AttemptToGetEmbeddingModels();
	}, []);

    return (
        <></>
    );
}