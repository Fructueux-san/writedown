import { atom } from "jotai";
//
// Notebooks
export const allNoteBooksAtom = atom(null);
export const allNotebooksNotesAtom = atom([]);
export const sidebarOpenAtom = atom(true);
export const ativeMainSidebarElementAtom = atom("all-notes");
export const activeNotebookAtom = atom(null);
export const selectedNotebookAtom = atom(null);


//Tags
export const allTagsAtom = atom(null);
export const selectedTagAtom = atom(0);

//Pinned note
export const pinnedNoteAtom = atom([]);


// Notes in trash
export const trashedNotesAtom = atom([]);

export const sidebarTitleAtom = atom("All notes");
export const reloadAtom = atom(true);
