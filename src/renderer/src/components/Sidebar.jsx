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
import { reloadAtom, selectedNotebookAtom, sidebarTitleAtom, trashedNotesAtom } from "../hooks/global";
import { AllNotesActions, NotebookActions, PinnedNotesAction, TrashNotesActions } from "./SidebarActions";

const SideBar = (props) => {

  const [notes, setNotes] = useAtom(allNotesAtom);
  const [selectedNote, setSelectedNote] = useAtom(selectedNoteAtom);
  const [createNoteModal, setCreateNoteModal] = useState(false);
  const [deleteNoteModal, setDeleteNoteModal] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [modalAdditionalInfo, setModalAdditionalInfo] = useState("");
  const [openedDoc, setOpenDoc] = useAtom(openDoc);
  const [sidebarTitle] = useAtom(sidebarTitleAtom);
  const [selectedNotebook] = useAtom(selectedNotebookAtom);
  const [reload, setReload] = useAtom(reloadAtom);

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
          updated_at: Date.now(),
          notebook: selectedNotebook
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

  function moveToTrash() {
    if (selectedNote != null) {
      window.electron.ipcRenderer.send("move-to-trash", selectedNote);
      console.log("Move to trash ");
      window.electron.ipcRenderer.on("move-to-tash-success", async (event, message) => {
        console.log("Move to trash ok. ");
      });
    }else {
      console.log("Note not found ! ");
    }
    setDeleteNoteModal(false);
    refreshSidebarTrigger();
    setSelectedNote(null);
    setOpenDoc(null);
  }

  // This function refresh global state variable and trigger the useEffect here to refresh
  function refreshSidebarTrigger(){
        window.electron.ipcRenderer.send("all-notebooks");
        // setReload(!reload);
        // setNotes(notes);
        if (sidebarTitle == "All notes"){
          window.electron.ipcRenderer.send("get-all-notes");
        }else if (sidebarTitle == "Pinned notes"){
          window.electron.ipcRenderer.send("pinned-notes");
        }else if (sidebarTitle == "Trash") {
          window.electron.ipcRenderer.send("all-in-trash", null);
        }else {
          window.electron.ipcRenderer.send("notebook-notes", selectedNotebook);
        }

        // setReload(!reload);
  }

  return (
    <div className="sidebar">
      <div className="head">
        <div className="title" style={{ color: "orange" }}>{sidebarTitle}</div>
        <span className="icon">

        {
          sidebarTitle == "Pinned notes" ?
            <RiPushpinLine size={20} color="orange"/> : sidebarTitle == 'All notes' ? <RiBook2Line size={20} color="orange"  /> : sidebarTitle == "Trash" ? <RiDeleteBin5Line size={20} color="orange" /> : null
        }
        </span>
      </div>
      <div className="actions">
        {
          sidebarTitle == 'Pinned notes' ? <PinnedNotesAction /> :
          sidebarTitle == 'All notes' ?
            <AllNotesActions
              createNoteModal={setCreateNoteModal}
              deleteNoteModal={setDeleteNoteModal}
            /> :
          sidebarTitle == "Trash" ? <TrashNotesActions /> :
          <NotebookActions createNoteModal={setCreateNoteModal} deleteNoteModal={setDeleteNoteModal} />
        }
      </div>
      <ul className="sidebar-content">
        {
          notes.map((element, index) => {
            return <Content
                      key={index}
                      id={element.id}
                      title={element.title}
                      lastEdit={element.updated_at}
                      notebookId={element.notebook}/>
            })
        }
      </ul>

      {createNoteModal ?
        <Modal
          openModal={createNoteModal}
          closeModal={() => setCreateNoteModal(false)}
          action="Create"
          title="New note"
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
            action="Move to trash"
            title="Trash"
            type="warning"
            actionCallback={moveToTrash}
          >
          <div style={{ display: "flex", alignItems:"center", justifyContent: "center", gap: "1rem", padding: "10px" }}>
            <GoAlert size={30} color="red"/>
            <span>Trash</span>
          </div>
          </Modal> :
          null
      }

    </div>
  );

}

export default SideBar;
