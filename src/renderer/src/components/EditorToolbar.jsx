import React, { useState } from "react";
import "../assets/editor-toolbar.css";

export const Toolbar = ({activate}) => {
  const [rawActive, setRawActive] = useState(true);
  const [previewActive, setPreviewActive] = useState(false)

  const activeRawBtn = () => {
    if (rawActive){
      ;
    }else{
      setPreviewActive(false);
      setRawActive(true);
      activate("editor");
    }
  }

  const activePreviewBtn = () => {
    if (previewActive){}
    else {
      setPreviewActive(true);
      setRawActive(false);
      activate("preview");
    }
  }

  return (
    <header>
      <div className="btn-bloc">
        <button className={(rawActive ? 'active' : '')} onClick={activeRawBtn}>Raw</button>
        <button className={(previewActive ? 'active' : '')} onClick={activePreviewBtn}>Preview</button>
      </div>
      <div className="actions">

      </div>
    </header>
  );

}
