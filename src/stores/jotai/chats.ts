import { atom } from 'jotai'

export type T_Chat = {
    id: number,

    title: string,
    model: string,

    updated_at: number,
    created_at: number,
};

export const chatsAtom = atom<T_Chat[]>([]);