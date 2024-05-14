import { atom } from "jotai";
//
// Notebooks
export const allNoteBooksAtom = atom(null);
export const sidebarOpenAtom = atom(false);
export const ativeMainSidebarElementAtom = atom("all-notes");
export const activeNotebookAtom = atom(null);


//Tags
export const allTagsAtom = atom(null);
export const selectedTagAtom = atom(0);

//Pinned note
export const pinnedNoteAtom = atom([]);
