import React, { useCallback } from "react";
import useCodemirror from "../utils/useCodemirror";
import { editor_fulfill } from "../utils/constants";

import '../assets/editor.css';

const Editor = () =>{
  const handleChange = useCallback(
    state => console.log("Change happen in the editor"), []
  );

  const [refContainer, editorView] = useCodemirror({
    initialDoc: editor_fulfill,
    onChange: handleChange,
  })
  return (
    <>
      <div className="editor-wrapper" ref={refContainer}></div>
    </>
  );
}


export default Editor;
