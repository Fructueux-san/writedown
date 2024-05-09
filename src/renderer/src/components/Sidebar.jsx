import React, { useEffect, useState } from "react";
import {LuFileSignature} from "react-icons/lu";
import {FaRegTrashCan} from "react-icons/fa6";
import { GoAlert } from "react-icons/go";
import { formatDateFromMs } from "../utils/helpers";
import { allNotesAtom, editorViewOpenedAtom, openDoc, openedObjectAtom, selectedNoteAtom, activeDocInformations} from "../hooks/editor";
import { useAtom } from "jotai";
import Modal from "./Modal";
import "../assets/sidebar.css";

const Content = ({id, title, lastEdit}) => {
    var date = formatDateFromMs(lastEdit);
    const [select, setSelected] = useAtom(selectedNoteAtom);
    const [open, setOpened] = useAtom(openDoc);
    const [rawActive, setRawActive] = useAtom(editorViewOpenedAtom);
    const [openedObject, setOpenedObject] = useAtom(openedObjectAtom);
    const [docInfo, setDocInfo] = useAtom(activeDocInformations);
    const [notes, setNotes] = useAtom(allNotesAtom);

    const [changeTitle, setChangeTitle] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newTitleinputStyle, setNewTitleInputStyle] = useState("1px solid red");

    useEffect(() => {
      if (newTitle !== "") {
        setNewTitleInputStyle("1px solid green");
      }else {
        setNewTitleInputStyle("1px solid red");
      }
    }, [newTitle]);

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
        {
          changeTitle ?
            <input type="text" placeholder={title} autoFocus={true}
              className="change-title-input"
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={(e) => {
                  if (e.key == "Enter"){
                    // change the name
                    console.log("Enter key down");
                    if (newTitle !== "") {
                      // Send event to main process for update
                      let data = {
                        id: id,
                        note: {
                          title: newTitle.trim()
                        }
                      }
                      window.electron.ipcRenderer.send("save-note", data);
                      window.electron.ipcRenderer.on("success", (event, data) => {
                        console.log("update successfull");
                        selectNote();
                        // Refresh notes
                        window.electron.ipcRenderer.send("get-all-notes");
                          window.electron.ipcRenderer.on("all-notes", (event, data) => {
                          setNotes(data);
                        });
                        setNewTitle("");
                      });
                      setChangeTitle(false);
                    }else {
                      alert("Le champs de est vide. Veuillez entrer un nom.");
                    }
                    // Hide input field
                  }else if (e.key == "Escape") {
                    console.log("Escape key down");
                    setChangeTitle(false);
                  }
                }
              }
              style={{ border: newTitleinputStyle }}
            /> :
            <div className="title" onDoubleClick={() => setChangeTitle(true)}>{title}</div>
        }

        <p>
          {date}
        </p>
      </li>
    );
}


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
      <div className="actions">
        <button onClick={() => setCreateNoteModal(true)}>
          <LuFileSignature size={15} />
        </button>
      {
        selectedNote != null ?
        <button onClick={() => setDeleteNoteModal(true)}>
          <FaRegTrashCan size={15} />
        </button> : null
      }

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
