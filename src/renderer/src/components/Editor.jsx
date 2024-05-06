import React, { useCallback, useEffect, useMemo, useState } from "react";
import useCodemirror from "../utils/useCodemirror";
import { editor_fulfill } from "../utils/constants";

import '../assets/editor.css';
import { useAtom } from "jotai";
import { activeDocInformations, openDoc, openedObjectAtom, selectedNoteAtom } from "../hooks/editor";
import { throttle } from "lodash";

const Editor = ({doc, onChange}) => {
  const [openedDoc, setOpenedDoc] = useAtom(openDoc);
  const [activeDoc] = useAtom(selectedNoteAtom);

  const [docIndex] = useAtom(selectedNoteAtom);
  const [docObject] = useAtom(openedObjectAtom);

  const save = (data) => {


    window.electron.ipcRenderer.send("save-note", data),
    window.electron.ipcRenderer.on("success", (event, message) => {
      console.log("[SAVING MESSAGE]", message);
    });

  }

  const handleChange = useCallback(
    state => {
      setOpenedDoc(state.doc.toString());
      let data = {
        id: docIndex,
        note: {
          title: docObject.title,
          content: state.doc.toString(),
          updated_at: Date.now()
        }
      };
      sendSave(data);

    }, []);

    const sendSave = useMemo(
      () => throttle (save, 3000, {leading: true, trailing: true}), []
    )

    const change = (state) => {

      setOpenedDoc(state.doc.toString());
    }

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
