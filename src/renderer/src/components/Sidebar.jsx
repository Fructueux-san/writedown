import React, { useEffect, useState } from "react";
import "../assets/sidebar.css";
import {LuFileSignature} from "react-icons/lu";
import {FaRegTrashCan} from "react-icons/fa6";
import { formatDateFromMs } from "../utils/helpers";
import { allNotesAtom, editorViewOpenedAtom, openDoc, openedObjectAtom, selectedNoteAtom, activeDocInformations} from "../hooks/editor";
import { useAtom } from "jotai";
import Modal from "./Modal";


const Content = ({id, title, lastEdit}) => {
    // var date = formatDateFromMs(lastEdit);
    const [select, setSelected] = useAtom(selectedNoteAtom);
    const [open, setOpened] = useAtom(openDoc);
    const [rawActive, setRawActive] = useAtom(editorViewOpenedAtom);
    const [openedObject, setOpenedObject] = useAtom(openedObjectAtom);
    const [docInfo, setDocInfo] = useAtom(activeDocInformations);
    function selectNote() {
      if (id !== select) {
        setOpened(null);
        setRawActive(false);
        setDocInfo(null);

        setSelected(id);
        let onEditing = window.electron.ipcRenderer.send("get-one-note", id);
        window.electron.ipcRenderer.on("one-note", async (event, data) => {
          setOpenedObject(await data);
          setOpened(data["content"]);
        });
      }
    }
    return (
      <li className={(id==select ? "active " : " ")+"content"} onClick={selectNote}>
        <div className="title">{title}</div>
        <p>
          {lastEdit}
        </p>
      </li>
    );
}


const SideBar = (props) => {

  const [notes, setNotes] = useAtom(allNotesAtom);
  const [createNoteModal, setCreateNoteModal] = useState(false);
  const [deleteNoteModal, setDeleteNoteModal] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [modalAdditionalInfo, setModalAdditionalInfo] = useState("");

  function handleNewNoteTitleChange(e) {
    setNewNoteTitle(e.target.value);
    setModalAdditionalInfo("");
  }

  useEffect(() => {
    console.log("Refreshing sidebar ...");
  }, [notes]);

  function createNote() {
    if (newNoteTitle !== "") {
        let data = {
          title: newNoteTitle.trim(),
          content: "",
          created_at: Date.now(),
          updated_at: Date.now()
        };
        window.electron.ipcRenderer.send("new-note", data);
        window.electron.ipcRenderer.on("new-note", async (event, message) => {
          console.log(message);
          setCreateNoteModal(false);
        });
      // Refresh notes
        window.electron.ipcRenderer.send("get-all-notes");
        window.electron.ipcRenderer.on("all-notes", (event, data) => {
          console.log(data);
          setNotes(data);
        });
    }else {
      setModalAdditionalInfo("Le champs est vide !");
    }
  }

  return (
    <div className="sidebar">
      <div className="actions">
        <button onClick={() => setCreateNoteModal(true)}>
          <LuFileSignature size={15} />
        </button>

        <button onClick={() => setDeleteNoteModal(true)}>
          <FaRegTrashCan size={15} />
        </button>
      </div>
      <ul className="sidebar-content">
        {
          notes.map((element, index) => <Content key={element.id} id={element.id} title={element.title} lastEdit={element.updated_at}/>)
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

    </div>
  );

}

export default SideBar;
