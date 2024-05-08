import React, { useEffect, useState, useRef} from "react";
import SideBar from "./Sidebar";
import Editor from "./Editor";

import "../assets/applayout.css";
import Preview from "./Previewer";
import { Toolbar } from "./EditorToolbar";
import { useAtom } from "jotai";
import { editorViewOpenedAtom, openDoc, selectedNoteAtom } from "../hooks/editor";
import DefaultLayout from "./DefaultLayout";
import DocumentInfo from "./DocumentInfo";



const AppLayout = () => {
  const [doc, setDoc] = useAtom(openDoc);
  const [noteIndex] = useAtom(selectedNoteAtom);
  const [rawActive] = useAtom(editorViewOpenedAtom);
  const previewRef = useRef();

  useEffect(() => {
    console.log("Note ID change ");
  }, [noteIndex]);
  return (
    <div className="app-layout">
      <SideBar />
      <section className="editor-layout">
        {doc !== null ? <Toolbar previewRef={previewRef}/> : null}
        {
          doc !== null ?
          rawActive ? <Editor doc={doc} onChange={setDoc} /> : <Preview doc={doc} previewRef={previewRef} /> :
          <DefaultLayout />
        }
        {doc !== null && rawActive ? <DocumentInfo /> : null}
      </section>
    </div>
  );
}


export default AppLayout;
