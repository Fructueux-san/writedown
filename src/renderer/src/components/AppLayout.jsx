import React, { useState } from "react";
import SideBar from "./Sidebar";
import Editor from "./Editor";

import "../assets/applayout.css";
import Preview from "./Previewer";
import { Toolbar } from "./EditorToolbar";
import { editor_fulfill } from "../utils/constants";
const AppLayout = () => {

  const [activeLayout, setActiveLayout] = useState("editor");
  return (
    <div className="app-layout">
      <SideBar />
      <section className="editor-layout">
        <Toolbar activate={setActiveLayout}/>
        {activeLayout == "editor" ?<Editor /> : <Preview doc={editor_fulfill} /> }
      </section>
    </div>
  );
}


export default AppLayout;
