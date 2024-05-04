import React, { useCallback, useEffect, useState } from "react";
import useCodemirror from "../utils/useCodemirror";
import { editor_fulfill } from "../utils/constants";

import '../assets/editor.css';
import { useAtom } from "jotai";
import { openDoc, selectedNoteAtom } from "../hooks/editor";

const Editor = ({doc, onChange}) => {
  const [openedDoc, setOpenedDoc] = useAtom(openDoc);
  const [activeDoc] = useAtom(selectedNoteAtom);
  const handleChange = useCallback(
    state => {
      setOpenedDoc(state.doc.toString());
    }, []);

   const [refContainer, editorView] = useCodemirror({
    initialDoc: doc,
    onChange: handleChange,
  });


  return (
    <>
      <div className="editor-wrapper" ref={refContainer}></div>
    </>
  );
}


export default Editor;
