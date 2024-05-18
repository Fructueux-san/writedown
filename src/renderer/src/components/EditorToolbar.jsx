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

        </div>
        <div className={"tags-list"+(tagsListOpen ? " open " : "")}>
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
