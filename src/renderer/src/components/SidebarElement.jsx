import React, { useEffect, useMemo, useState } from "react";
import { formatDateFromMs } from "../utils/helpers";
import { allNotesAtom, editorViewOpenedAtom, openDoc, openedObjectAtom, selectedNoteAtom, activeDocInformations} from "../hooks/editor";
import { useAtom } from "jotai";
import "../assets/sidebar.css";
import { RiBookMarkedLine } from "react-icons/ri";
import { allNoteBooksAtom } from "../hooks/global";

export const Content = ({id, title, lastEdit, notebookId}) => {
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

    const [notebooks] = useAtom(allNoteBooksAtom);

    function notebookInformation(id) {
      if (id != null && notebooks != null) {
        for (let i=0; i<notebooks.length; i++) {
          if (notebooks[i].id == id) {
            return notebooks[i];
          }
        }
      }else {
        return null;
      }
    }

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
          // let newWindowTitle = getNotebookInfo(data.notebook).name + " ∙ " + data.title;
          // window.electron.ipcRenderer.send("window-title", data.name);
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
            <div className={"title" + (select==id ? " active" : "")} onDoubleClick={() => setChangeTitle(true)}>{title}</div>
        }
        <p className="notebook">
          {
            notebookId ? <><RiBookMarkedLine size={20} /><span>{notebooks && notebookId ? notebookInformation(notebookId).name : null}</span> </>: null
          }
        </p>
        <p className="note-date">
          {date}
        </p>
      </li>
    );
}


