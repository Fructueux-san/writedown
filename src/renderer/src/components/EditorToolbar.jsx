import React, { useState } from "react";
import { RiCloseFill, RiCloseCircleLine } from "react-icons/ri";
import "../assets/editor-toolbar.css";
import { useAtom } from "jotai";
import { editorViewOpenedAtom, openDoc, selectedNoteAtom } from "../hooks/editor";

export const Toolbar = () => {
  const [editorActive, setEditorActive] = useAtom(editorViewOpenedAtom);
  const [openedNote, setOpenedNote] = useAtom(selectedNoteAtom);
  const [doc, setDoc] = useAtom(openDoc);

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

  return (
    <header>
      <div className="btn-bloc">
        <button className={(editorActive ? 'active' : '')} onClick={activeRawBtn}>Raw</button>
        <button className={(!editorActive ? 'active' : '')} onClick={activePreviewBtn}>Preview</button>
      </div>
      <div className="actions">
        <RiCloseCircleLine size={22} color="white" className="close-btn" title="close" onClick={closeActiveNote}/>
      </div>
    </header>
  );

}
