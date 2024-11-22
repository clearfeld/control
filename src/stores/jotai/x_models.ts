import { atom } from 'jotai'

export type T_XAIModels = {
    language_models: T_XAILanguageModel[]
};

export type T_XAILanguageModel = {
    model: string;
    input_modalities: string[];
    output_modalities: string[];
};

export const xAiModelsAtom = atom<T_XAIModels[] | null>(null);