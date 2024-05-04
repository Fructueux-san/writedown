import React from "react";
import { RiPenNibLine } from "react-icons/ri";
import "../assets/default-layout.css";

const DefaultLayout = () => {
  return (
    <div className="default-layout">
        <RiPenNibLine color="#3b3b3b" size={70} className="icon" />
        <h3>Open note or <a href="#">Create</a> new one</h3>
    </div>);
}


export default DefaultLayout;
