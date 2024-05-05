import React from "react";
import "../assets/document-info.css";
import { useAtom } from "jotai";
import { activeDocInformations } from "../hooks/editor";

const DocumentInfo = (props) => {

  const [docInfo] = useAtom(activeDocInformations);
  return (
    <div className="editor-info">
      <ul>
        <li>Lines : <span className="value">{docInfo != null ? docInfo.lines : 0}</span> </li>
        <li>Words : <span className="value">{docInfo != null ? docInfo.words : 0}</span> </li>
        <li>Current : <span className="value">{docInfo != null ? docInfo.currentLine : 0}</span> </li>
    </ul>
    </div>
  );
}

export default DocumentInfo;
