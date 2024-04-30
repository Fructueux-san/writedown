import React from "react";
import SideBar from "./Sidebar";
import Editor from "./Editor";

import "../assets/applayout.css";
const AppLayout = () => {
  return (
    <div className="app-layout">
      <SideBar />
      <Editor />
    </div>
  );
}


export default AppLayout;
