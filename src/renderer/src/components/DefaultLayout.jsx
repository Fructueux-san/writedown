import React, { useState } from "react";
import { RiPenNibLine } from "react-icons/ri";
import "../assets/default-layout.css";
import { useAtom } from "jotai";
import { allNotesAtom, selectedNoteAtom } from "../hooks/editor";
import Modal from "./Modal";

const DefaultLayout = () => {
  const [notes, setNotes] = useAtom(allNotesAtom);
  const [selectedNote, setSelectedNote] = useAtom(selectedNoteAtom);
  const [createNoteModal, setCreateNoteModal] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [modalAdditionalInfo, setModalAdditionalInfo] = useState("");

  function handleNewNoteTitleChange(e) {
    setNewNoteTitle(e.target.value);
    setModalAdditionalInfo("");
  }

  function refreshSidebarTrigger(){
      // Refresh notes
        window.electron.ipcRenderer.send("get-all-notes");
        window.electron.ipcRenderer.on("all-notes", (event, data) => {
          console.log(data);
          setNotes(data);
        });
  }

  function createNote() {
    if (newNoteTitle !== "") {
        let data = {
          title: newNoteTitle.trim(),
          content: "",
          created_at: Date.now(),
          updated_at: Date.now()
        };
        window.electron.ipcRenderer.send("new-note", data);
        window.electron.ipcRenderer.on("new-note", async (event, data) => {
          console.log(data["message"]);
          setCreateNoteModal(false);
          setSelectedNote(data["data"].id);
        });
      // Refresh notes
      refreshSidebarTrigger();
    }else {
      setModalAdditionalInfo("Le champs est vide !");
    }
  }


  return (
    <div className="default-layout">
        <RiPenNibLine color="#3b3b3b" size={70} className="icon" />
        <h3>Open note or <a href="#" onClick={() => setCreateNoteModal(true)}>Create</a> new one</h3>


      {createNoteModal ?
        <Modal
          openModal={createNoteModal}
          closeModal={() => setCreateNoteModal(false)}
          action="Créer"
          title="Nouvelle note"
          type="success"
          actionCallback={createNote}
        >
        <input type="text" style={{ backgroundColor:"transparent", color: "white", border: "1px solid #3b3b3b", width: "200px", height: "1.5rem", paddingLeft:"5px", fontSize: "1.2rem" }} onChange={handleNewNoteTitleChange}/>
        <div className="over-infos" style={{ color: "red" }}>
          {modalAdditionalInfo}
        </div>
        </Modal> : null}
    </div>
  );
}


export default DefaultLayout;
