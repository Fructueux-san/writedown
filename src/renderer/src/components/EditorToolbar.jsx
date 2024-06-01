import React, { useEffect, useState } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { BsMarkdown, BsFileEarmarkPdf } from "react-icons/bs";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import "../assets/editor-toolbar.css";
import { useAtom } from "jotai";
import { editorViewOpenedAtom, openDoc, selectedNoteAtom,openedObjectAtom } from "../hooks/editor";
import { saveToPdf } from "../utils/helpers";
import { allTagsAtom } from "../hooks/global";

export const Toolbar = ({previewRef}) => {
  const [editorActive, setEditorActive] = useAtom(editorViewOpenedAtom);
  const [openedNote, setOpenedNote] = useAtom(selectedNoteAtom);
  const [doc, setDoc] = useAtom(openDoc);
  const [docInfo, setDocInfo] = useAtom(openedObjectAtom);
  const [tagsListOpen, setTagsListOpen] = useState(false);
  const [tags, setTags] = useAtom(allTagsAtom);
  const [selectedNoteTags, setSelectedNoteTags] = useState(null);

  const activeRawBtn = () => {
    if (editorActive){
      ;
    }else{
      setEditorActive(true);
    }
  }

  const activePreviewBtn = () => {
    if (!editorActive){}
    else {
      setEditorActive(false);
    }
  }

  const closeActiveNote = () => {
    setOpenedNote(null);
    setDoc(null);
    setEditorActive(false);
  }

  function toogleTagsList() {
    setTagsListOpen(!tagsListOpen);
  }

  function tagData(tagId) {
    if (tags) {
      for (let i=0; i<tags.length; i++) {
        if (tags[i].id == tagId) return tags[i];
      }
    }
    return null;
  }

  function addTagToNote(tagId) {
    let data = {
      tagId: tagId,
      noteId: openedNote
    };
    window.electron.ipcRenderer.send("add-tag-to-note", data);
    window.electron.ipcRenderer.send("get-note-tags", openedNote);
    toogleTagsList();
  }

  useEffect(() => {
    window.electron.ipcRenderer.send("get-note-tags", openedNote);
    window.electron.ipcRenderer.on("note-tags", (event, data) => {
      console.log(`Note ${openedNote} tags are : `, data)
      setSelectedNoteTags(data);
    });

    window.electron.ipcRenderer.on("add-tag-to-note-success", (event, data) => {
      console.log("Tag successfully added to notes.", data);
      // setSelectedNoteTags(data);
      window.electron.ipcRenderer.send("get-note-tags", openedNote);
    });
  }, []);

  const saveAsPdfFile = async (e) => {
      window.electron.ipcRenderer.send("pdf-on-fs", {
        id: openedNote,
        title: docInfo.title,
      });

    window.electron.ipcRenderer.on("pdf-path", (event, message) => {
      const input = previewRef.current;
      saveToPdf(input, message);
    });
    console.log("PDF successfully saved");
  }

  const saveAsMd = async (e) => {
    const data = Buffer(doc);
    window.electron.ipcRenderer.send("md-on-fs", {
      data: data,
      id: openedNote,
      title: docInfo.title
    });
  }

  return (
    <header>
      <div className="btn-bloc">
        <button className={(editorActive ? 'active' : '')} onClick={activeRawBtn}>Raw</button>
        <button className={(!editorActive ? 'active' : '')} onClick={activePreviewBtn}>Preview</button>
      <div className="tags-block">
        <button className="add-tag btn" onClick={toogleTagsList}>Add tag</button>
        <div className="tags">
        {
          selectedNoteTags ?
            selectedNoteTags.map((element, index) => {
              return (
                <div
                  className="tag"
                  key={index}
                  style={{
                    border: "1px solid "+tagData(element.tag).color,
                    color: tagData(element.tag).color
                  }}
                >
                    <span className="title">{tagData(element.tag).name}</span>
                    <span className="icon"></span>
                </div>)
            }): null
        }
        </div>
        <div className={"tags-list"+(tagsListOpen ? " open " : "")}>
          <ul>
            {
              tags != null ?
                tags.map(element => {
                  return(
                    <li key={element.id} onClick={() => addTagToNote(element.id)}>
                      <div className="color" style={{ backgroundColor: element.color }}>
                      </div>{element.name}
                    </li>)
                }): null
            }
          </ul>
        </div>
      </div>
      </div>
      <div className="actions" >
      {   /*<button>
            <BsFileEarmarkPdf size={22} color="white" className="btn" onClick={saveAsPdfFile}/>
          </button>*/
      }
        <button>
            <BsMarkdown size={22} color="white" className="btn" onClick={saveAsMd}/>
        </button>
        <button onClick={closeActiveNote}>
          <RiCloseCircleLine size={22} color="white" className="close-btn" title="close"/>
        </button>
      </div>
    </header>
  );

}
