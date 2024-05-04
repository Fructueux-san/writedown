import { atom } from "jotai";

export const selectedNoteAtom = atom(null);
export const allNotes = [];
export const allNotesAtom = atom(allNotes);
export let openDoc = atom(null);
export const editorViewOpenedAtom = atom(false);

