import { atom } from "jotai";

export const selectedNoteAtom = atom(null);
export const allNotes = [];
export const allNotesAtom = atom(allNotes);
export let openDoc = atom(null);
export const editorViewOpenedAtom = atom(true);



// window.electron.ipcRenderer.send("one-note", get(selectedNoteAtom));
