import React, { useEffect, useState } from "react";
import SideBar from "./Sidebar";
import Editor from "./Editor";

import "../assets/applayout.css";
import Preview from "./Previewer";
import { Toolbar } from "./EditorToolbar";
import { editor_fulfill } from "../utils/constants";
import { useAtom } from "jotai";
import { editorViewOpenedAtom, openDoc, selectedNoteAtom } from "../hooks/editor";
import DefaultLayout from "./DefaultLayout";
const AppLayout = () => {
  const [doc, setDoc] = useAtom(openDoc);
  const [noteIndex] = useAtom(selectedNoteAtom);
  const [rawActive] = useAtom(editorViewOpenedAtom);

  useEffect(() => {
    console.log("Note ID change ");
  }, [noteIndex]);
  return (
    <div className="app-layout">
      <SideBar />
      <section className="editor-layout">
        {doc !== null ? <Toolbar /> : null}
        {
          doc !== null ?
          rawActive ? <Editor doc={doc} onChange={setDoc} /> : <Preview doc={doc} /> :
          <DefaultLayout />
        }
      </section>
    </div>
  );
}


export default AppLayout;
