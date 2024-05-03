import React, { useEffect } from "react";
import AppLayout from "./components/AppLayout";
import { atom, useAtom } from "jotai";
import { allNotesAtom } from "./hooks/editor";

// const selectedNoteAtom = atom(null);
// const allNotesAtom = atom([]);

const  App = () => {

  const [notes, setNotes] = useAtom(allNotesAtom);
  useEffect(()=>{
    window.electron.ipcRenderer.send("get-all-notes");
    window.electron.ipcRenderer.on("all-notes", (event, data) => {
      console.log(data);
      setNotes(data);
    });

  }, []);


  return (
    <>
      <AppLayout></AppLayout>
    </>
  )
}

export default App

