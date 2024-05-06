import React from "react";
import "../assets/sidebar.css";
import {LuFileSignature} from "react-icons/lu";
import {FaRegTrashCan} from "react-icons/fa6";
import { formatDateFromMs } from "../utils/helpers";
import { allNotesAtom, editorViewOpenedAtom, openDoc, openedObjectAtom, selectedNoteAtom, activeDocInformations} from "../hooks/editor";
import { useAtom } from "jotai";


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

  return (
    <div className="sidebar">
      <div className="actions">
        <button>
          <LuFileSignature size={15} />
        </button>

        <button>
          <FaRegTrashCan size={15} />
        </button>
      </div>
      <ul className="sidebar-content">
        {
          notes.map((element, index) => <Content key={element.id} id={element.id} title={element.title} lastEdit={element.updated_at}/>)
        }
      </ul>
    </div>
  );

}

export default SideBar;
