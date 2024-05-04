import React, { useState } from "react";
import "../assets/editor-toolbar.css";
import { useAtom } from "jotai";
import { editorViewOpenedAtom } from "../hooks/editor";

export const Toolbar = () => {
  const [editorActive, setEditorActive] = useAtom(editorViewOpenedAtom);

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

  return (
    <header>
      <div className="btn-bloc">
        <button className={(editorActive ? 'active' : '')} onClick={activeRawBtn}>Raw</button>
        <button className={(!editorActive ? 'active' : '')} onClick={activePreviewBtn}>Preview</button>
      </div>
      <div className="actions">

      </div>
    </header>
  );

}
