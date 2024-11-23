import { atom } from "jotai";
import type { T_XAILanguageModel } from "./x_models";

export const ChatSelectedModelAtom = atom<T_XAILanguageModel | null>({
	model: "grok-beta",
	input_modalities: ["text"],
	output_modalities: ["text"],
});
