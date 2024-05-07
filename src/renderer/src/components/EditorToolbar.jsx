import React, { useState } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { BsMarkdown, BsFileEarmarkPdf } from "react-icons/bs";

import "../assets/editor-toolbar.css";
import { useAtom } from "jotai";
import { editorViewOpenedAtom, openDoc, selectedNoteAtom,openedObjectAtom } from "../hooks/editor";

export const Toolbar = () => {
  const [editorActive, setEditorActive] = useAtom(editorViewOpenedAtom);
  const [openedNote, setOpenedNote] = useAtom(selectedNoteAtom);
  const [doc, setDoc] = useAtom(openDoc);
  const [docInfo, setDocInfo] = useAtom(openedObjectAtom);

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

  const saveAsPdfFile = async (e) => {
      const buffer = window.Buffer.of("Hello");
      window.electron.ipcRenderer.invoke("pdf-on-fs", {
        data: buffer,
        id: openedNote,
        title: docInfo.title,
      });
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
      </div>
      <div className="actions" >
        <button>
          <BsFileEarmarkPdf size={22} color="white" className="btn" onClick={saveAsPdfFile}/>
        </button>
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
