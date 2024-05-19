import React, { useState } from "react";
import "../assets/newtag.css";
import { colorList } from "../utils/constants";

export function NewTag (props) {
  const [selectedColor, setSelectedColor] = useState(null);
  let i = 0;
  return <div className="newtag">
    <input className="tag-name" type="text" placeholder="Enter the tag name here" autoFocus={true}/>
    <div className="colorgrid">
      {
          colorList.map((element, index) => {
            return (
              <div className="color" style={{ backgroundColor: element }}>
              </div>
            )
          })
      }
    </div>
    <button className="btn-success">Ok</button>
  </div>
}
