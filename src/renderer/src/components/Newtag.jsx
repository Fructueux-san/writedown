import React, { useState } from "react";
import "../assets/newtag.css";
import { colorList } from "../utils/constants";
import { FaCheck } from "react-icons/fa6";

export function NewTag (props) {
  const [selectedColor, setSelectedColor] = useState(null);
  return <div className="newtag">
    <input className="tag-name" type="text" placeholder="Tag name" autoFocus={true}/>
    <div className="colorgrid">
      {
          colorList.map((element, index) => {
            return (
              <div
                onClick={() => setSelectedColor(element)}
                className={"color" + (selectedColor==element ? " selected" : "")}
                style={{ backgroundColor: element }}
              >
              {
                selectedColor == element ?
                  <FaCheck /> : null
              }
              </div>
            )
          })
      }
    </div>
    <button className="btn-success">Ok</button>
  </div>
}
