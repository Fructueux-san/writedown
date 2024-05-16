import React, { useEffect, useState } from "react";
import {LuFileSignature} from "react-icons/lu";
import {FaRegTrashCan} from "react-icons/fa6";
import { GoAlert } from "react-icons/go";
import { allNotesAtom, editorViewOpenedAtom, openDoc, selectedNoteAtom, activeDocInformations} from "../hooks/editor";
import { useAtom } from "jotai";
import Modal from "./Modal";
import "../assets/sidebar.css";
import {Content} from "./SidebarElement";
import { RiBook2Line, RiDeleteBin5Fill, RiDeleteBin5Line, RiPushpinLine } from "react-icons/ri";
import { sidebarTitleAtom } from "../hooks/global";
import { AllNotesActions, NotebookActions, PinnedNotesAction, TrashNotesActions } from "./SidebarActions";

const SideBar = (props) => {

  const [notes, setNotes] = useAtom(allNotesAtom);
  const [selectedNote, setSelectedNote] = useAtom(selectedNoteAtom);
  const [createNoteModal, setCreateNoteModal] = useState(false);
  const [deleteNoteModal, setDeleteNoteModal] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [modalAdditionalInfo, setModalAdditionalInfo] = useState("");
  const [openedDoc, setOpenDoc] = useAtom(openDoc);
  const [editorViewOpened, setViewOpenedAtom] = useAtom(editorViewOpenedAtom);
  const [docInfo, setDocInfo] = useAtom(activeDocInformations);
  const [sidebarTitle] = useAtom(sidebarTitleAtom);

  function reload() {
    setSelectedNote(null);
    setOpenDoc(null);
    setViewOpenedAtom(false);
    setDocInfo(null);
  }

  function handleNewNoteTitleChange(e) {
    setNewNoteTitle(e.target.value);
    setModalAdditionalInfo("");
  }

  useEffect(() => {
    console.log("Refreshing sidebar ...");
  }, [notes, allNotesAtom]);

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
        });
      // Refresh notes
      refreshSidebarTrigger();
    }else {
      setModalAdditionalInfo("Le champs est vide !");
    }
  }

  function deleteNote() {
    if (selectedNote != null) {
      window.electron.ipcRenderer.send("delete-note", selectedNote);
      window.electron.ipcRenderer.on("deletion-successful", async (event, message) => {
        console.log(message);
        setSelectedNote(null);
        setOpenDoc(null);
      });
    }else {
      console.log("Note not found ! ");
    }
    setDeleteNoteModal(false);
    refreshSidebarTrigger();
  }

  // This function refresh global state variable and trigger the useEffect here to refresh
  function refreshSidebarTrigger(){
      // Refresh notes
        window.electron.ipcRenderer.send("get-all-notes");
        window.electron.ipcRenderer.on("all-notes", (event, data) => {
          console.log(data);
          setNotes(data);
        });
  }

  return (
    <div className="sidebar">
      <div className="head">
        <div className="title">{sidebarTitle}</div>
        <span className="icon">

        {
          sidebarTitle == "Pinned notes" ?
            <RiPushpinLine size={20} color="orange"/> : sidebarTitle == 'All notes' ? <RiBook2Line size={20} color="orange"  /> : sidebarTitle == "Trash" ? <RiDeleteBin5Line size={20} color="orange" /> : null
        }
        </span>
      </div>
      <div className="actions">
        {sidebarTitle == 'Pinned notes' ? <PinnedNotesAction /> : sidebarTitle == 'All notes' ? <AllNotesActions createNoteModal={setCreateNoteModal} deleteNoteModal={setDeleteNoteModal}/> : sidebarTitle == "Trash" ? <TrashNotesActions /> : <NotebookActions createNoteModal={setCreateNoteModal} deleteNoteModal={setDeleteNoteModal} /> }
      </div>
      <ul className="sidebar-content">
        {
          notes.map((element, index) => <Content key={index} id={element.id} title={element.title} lastEdit={element.updated_at}/>)
        }
      </ul>

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

      {
        deleteNoteModal && selectedNote != null ?
          <Modal
            openModal={deleteNoteModal}
            closeModal={() => setDeleteNoteModal(false)}
            action="Supprimer"
            title="Note suppression"
            type="danger"
            actionCallback={deleteNote}
          >
          <div style={{ display: "flex", alignItems:"center", justifyContent: "center", gap: "1rem", padding: "10px" }}>
            <GoAlert size={30} color="red"/>
            <span>Supprimer cette note. Cette action est irréversible !</span>
          </div>
          </Modal> :
          null
      }

    </div>
  );

}

export default SideBar;
