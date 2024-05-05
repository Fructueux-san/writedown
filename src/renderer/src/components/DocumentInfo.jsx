import React from "react";
import "../assets/document-info.css";

const DocumentInfo = (props) => {

  return (
    <div className="editor-info">
      <ul>
        <li>Lines : <span className="value">10</span> </li>
        <li>Words : <span className="value">11</span> </li>
        <li>Cols : <span className="value">8</span> </li>
    </ul>
    </div>
  );
}

export default DocumentInfo;
