import { atom } from "jotai";

export const selectedNoteAtom = atom(null);
export const allNotes = [];
export const allNotesAtom = atom(allNotes);
export let openDoc = atom(null);



// window.electron.ipcRenderer.send("one-note", get(selectedNoteAtom));
