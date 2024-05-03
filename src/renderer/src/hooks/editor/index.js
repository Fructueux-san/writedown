import { atom } from "jotai";

export const selectedNoteAtom = atom(null);
export const allNotes = [];
export const allNotesAtom = atom(allNotes);
export const openDoc = atom(
    (get) => get(selectedNoteAtom) === null ?
    "# Welcome dude !" :
    window.db.getNoteInfo()
);
