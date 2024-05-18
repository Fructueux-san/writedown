import React, { useEffect } from "react";
import AppLayout from "./components/AppLayout";
import { atom, useAtom } from "jotai";
import { allNotesAtom, selectedNoteAtom } from "./hooks/editor";
import { allNoteBooksAtom, allNotebooksNotesAtom, allTagsAtom, pinnedNoteAtom, reloadAtom, trashedNotesAtom } from "./hooks/global";

// const selectedNoteAtom = atom(null);
// const allNotesAtom = atom([]);

const  App = () => {

  const [notes, setNotes] = useAtom(allNotesAtom);
  const [notebooks, setNotebooks] = useAtom(allNoteBooksAtom);
  const [tags, setTags] = useAtom(allTagsAtom);
  const [pinned, setPinned] = useAtom(pinnedNoteAtom);
  const [notesbookNotesAtom, setNotesbookNotesAtom] = useAtom(allNotebooksNotesAtom);
  const [trashedNotes, setTrashedNotes] = useAtom(trashedNotesAtom);
  const [selectedNote] = useAtom(selectedNoteAtom);
  const [reload] = useAtom(reloadAtom);
  useEffect(()=>{
    //Get all notes from backend
    window.electron.ipcRenderer.send("get-all-notes");
    window.electron.ipcRenderer.on("all-notes", (event, data) => {
      console.log(data);
      setNotes(data);
      setNotesbookNotesAtom(data);
    });

    // Get all notebooks from database
    window.electron.ipcRenderer.send("all-notebooks");
    window.electron.ipcRenderer.on("all-notebooks-success", (event, data) => {
      console.log(data);
      setNotebooks(data);
    });

    window.electron.ipcRenderer.send("all-tags", null);
    window.electron.ipcRenderer.on("tags-success", (event, data) => {
      console.log("TAGS", data);
      setTags(data);
    });

    window.electron.ipcRenderer.send("pinned-notes", null);
    window.electron.ipcRenderer.on("pinned-notes-success", (event, data) => {
      console.log("PINNED", data);
      setPinned(data);
    });


    window.electron.ipcRenderer.send("all-in-trash", null);
    window.electron.ipcRenderer.on("all-in-trash", (event, data) => {
      console.log(`Trash notes : `, data);
      setTrashedNotes(data);
    });

  }, [reload]);

  useEffect(() => {
    console.log("Refreshing main");
  }, [selectedNote, reload]);


  return (
    <>
      <AppLayout></AppLayout>
    </>
  )
}

export default App

