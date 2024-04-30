import React, { useCallback } from "react";
import useCodemirror from "../utils/useCodemirror";

import '../assets/editor.css';

const Editor = () =>{
  const handleChange = useCallback(
    state => onChange(state.doc.toString()), []
  );

  const [refContainer, editorView] = useCodemirror({
    initialDoc: "# Hello world !",
    onChange: handleChange,
  })
  return (
    <>
      <div className="editor-wrapper" ref={refContainer}></div>
    </>
  );
}


export default Editor;