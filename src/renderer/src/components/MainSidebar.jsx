import { FaAngleRight, FaBookmark, FaBookAtlas } from "react-icons/fa6";
import {RiAddCircleLine, RiBookMarkedLine, RiDeleteBin5Line, RiHashtag, RiPriceTag3Line, RiPushpinLine} from "react-icons/ri"
import "../assets/main-sidebar.css";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import { useAtom } from "jotai";
import { allNoteBooksAtom, allNotebooksNotesAtom, allTagsAtom, pinnedNoteAtom, reloadAtom, selectedNotebookAtom, sidebarTitleAtom, trashedNotesAtom } from "../hooks/global";
import { allNotesAtom, selectedNoteAtom } from "../hooks/editor";

export default function MainSidebar () {
  const [notebookListOpen, setNotebookListOpen] = useState(true);
  const [selectedNotebook, setSelectedNotebook] = useAtom(selectedNotebookAtom);
  const [newNotebookName, setNewnotebookName] = useState("");

  // Menu active state
  const [activeSubmenu, setActiveSubmenu] = useState("all-notes");

  const [tagListOpen, setTagListOpen] = useState(false);


  // Modal states
  const [notebookModalOpen, setNotebookModalOpen] = useState(false);
  const [modalAdditionalInfo, setModalAdditionalInfo] = useState("");

  // Atoms
  const [notebooksAtom, setNotebooksAtom] = useAtom(allNoteBooksAtom);
  const [tags, setTags] = useAtom(allTagsAtom);
  const [allNotesbookNotes] = useAtom(allNotebooksNotesAtom);
  const [pinned, setPinned] = useAtom(pinnedNoteAtom);
  const [notes, setNotes] = useAtom(allNotesAtom);
  const [trashedNotes, setTrashedNotes] = useAtom(trashedNotesAtom);
  const [sidebarTitle, setSidebarTitle] = useAtom(sidebarTitleAtom);
  const [selectedNote] = useAtom(selectedNoteAtom);
  const [reload] = useAtom(reloadAtom);

  useEffect(() => {
    console.log("Main Sidebar Refresh");
  }, [notebooksAtom, notes, pinned, trashedNotes, tags, selectedNote, reload])

  const notebookCreation = () => {
    console.log("Notebook creation button hit");
    if (newNotebookName !== "") {
        let data = {
          name: newNotebookName.trim(),
          description: "",
          created_at: Date.now(),
          updated_at: Date.now()
        };
        window.electron.ipcRenderer.send("new-notebook", data);
        window.electron.ipcRenderer.on("success", async (event, data) => {
          console.log(data);
          setNotebookModalOpen(false);
          setNewnotebookName("");
        });
      // Refresh notes
    }else {
      setModalAdditionalInfo("Le champs est vide !");
    }
  }
  const handleNotebookNamechange = (e) => {
    setNewnotebookName(e.target.value);
    setModalAdditionalInfo("");
  }

  const getNotebookNotes = (id) => {
    setSelectedNotebook(id);
    window.electron.ipcRenderer.send("notebook-notes", id);
    window.electron.ipcRenderer.on("notebook-notes-success", (event, data) => {
      console.log(`Notebook ${id} notes : `, data);
      setNotes(data);
    });
  }

  const allInTrash = () => {
    window.electron.ipcRenderer.send("all-in-trash", null);
    window.electron.ipcRenderer.on("all-in-trash", (event, data) => {
      console.log(`Trash notes : `, data);
      setNotes(data);
      setTrashedNotes(data);
    });
  }

  return (
<div className="main-sidebar">
  <div className={"main-sidebar-section all-notes "}>
    <div
      className={"head " + (activeSubmenu=='all-notes' ? "active " : "")}
      onDoubleClick={() => {
        setSidebarTitle("All notes");
        setActiveSubmenu("all-notes");
        window.electron.ipcRenderer.send("get-all-notes");
        window.electron.ipcRenderer.on("all-notes", (event, data) => {
          setNotes(data);
        });
      }

      }>
      <div className="leading">
        <RiHashtag size={20} color="white"/>
        <span className="title">Vos notes</span>
      </div>
      <span className="counter">{allNotesbookNotes.length}</span>
      <FaAngleRight color="white" className="right-angle-icon" />
    </div>
  </div>
  <div className="main-sidebar-section pin">
    <div className={"head"+ (activeSubmenu=='pinned' ? " active" : "")}
      onDoubleClick={() => {
        setSidebarTitle("Pinned notes");
        setActiveSubmenu("pinned");
        window.electron.ipcRenderer.send("pinned-notes", null);
        window.electron.ipcRenderer.on("pinned-notes-success", (event, data) => {
          setNotes(data);
        });
    }}>
      <div className="leading">
        <RiPushpinLine size={20} color="white"/>
        <span className="title">Pinned</span>
      </div>
      <span className="counter">{pinned.length}</span>
    </div>
    <div className="content">

    </div>
  </div>


  <div className="main-sidebar-section notebooks">
    <div className={"head"+ (activeSubmenu=='notebooks' ? " active" : "")}
      onDoubleClick={() => {setNotebookListOpen(!notebookListOpen); setActiveSubmenu("notebooks");} }>
      <div className="leading">
        <RiBookMarkedLine size={20} color="white"/>
        <span className="title">Votre carnet</span>
      </div>
      <RiAddCircleLine size={20} onClick={() =>setNotebookModalOpen(true)}/>
    </div>
    <div className={"content"+(notebookListOpen ? " open": "")}>
      <ul className="notebook-list">
        {
          notebooksAtom != null ?
            notebooksAtom.map(element => {
              return (
                    <li key={element.id}
                      onDoubleClick={() =>{
                        setActiveSubmenu("notebooks");
                        setSidebarTitle(element.name)
                        getNotebookNotes(element.id)}
                      }
                    >
                      <div className="notebook">
                        <FaAngleRight size={12}/>
                        <span className="notebook-name">{element.name}</span>
                      </div>
                      <span className="counter">{element.notes_count}</span>
                    </li>

              );
            }) : null
        }
      </ul>
    </div>
  </div>

  <div className="main-sidebar-section trash">
    <div className={"head"+ (activeSubmenu=='trash' ? " active" : "")} onDoubleClick={() => {setSelectedNotebook(null); allInTrash(); setActiveSubmenu("trash"); setSidebarTitle("Trash")}}>
      <div className="leading">
        <RiDeleteBin5Line size={20} color="white"/>
        <span className="title">Corbeille</span>
      </div>
      <span className="counter">{trashedNotes.length}</span>
    </div>
    <div className="content">

    </div>
  </div>
  <div className="main-sidebar-section tags">
    <div className="head" onClick={() => setTagListOpen(!tagListOpen)}>
      <div className="leading">
        <RiPriceTag3Line size={20} color="white"/>
        <span className="title">Tags</span>
      </div>
      <span className="counter">3</span>
    </div>
    <div className={ "content" + (tagListOpen ?" open": "")}>
      <ul>
        {
          tags != null ?
            tags.map(element => {
              return(
                <li key={element.id}>
                  <div className="color" style={{ backgroundColor: element.color }}>
                  </div>{element.name}
                </li>)
            }): null
        }
      </ul>
    </div>
  </div>


      {
        notebookModalOpen ?
          <Modal
            openModal={notebookModalOpen}
            closeModal={() => setNotebookModalOpen(false)}
            action="Créer"
            title="Creation d'un carnet"
            type="success"
            actionCallback={notebookCreation}
          >
          <div style={{ display: "flex", alignItems:"center", justifyContent: "center", gap: "1rem", padding: "10px" }}>
          <input
            type="text"
            style={{
              backgroundColor:"transparent",
              color: "white",
              border: "1px solid #3b3b3b",
              width: "200px",
              height: "1.5rem",
              paddingLeft:"5px",
              fontSize: "1.2rem"
              }}
            onChange={handleNotebookNamechange}/>
            <div className="over-infos" style={{ color: "red" }}>
              {modalAdditionalInfo}
            </div>
          </div>
          </Modal> :
          null
      }
</div>

    // Modals

  );
}
