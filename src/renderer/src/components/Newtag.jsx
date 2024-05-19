import React, { useState } from "react";
import "../assets/newtag.css";
import { colorList } from "../utils/constants";
import { FaCheck } from "react-icons/fa6";

export function NewTag (props) {
  const [selectedColor, setSelectedColor] = useState(null);
  const [newTagName, setNewTagName] = useState(null);

  function createTag() {
    if (selectedColor != null && newTagName != null || newTagName != "") {
      let data = {
        name: newTagName,
        color: selectedColor,
        created_at: Date.now(),
        updated_at: Date.now()
      };
      window.electron.ipcRenderer.send("new-tag", data);
      props.close();
    }else {
      alert("Set a tag name and select color");
    }
  }

  function handleTagNameChanges(e) {
    setNewTagName(e.target.value);
  }

  return <div className="newtag">
    <input className="tag-name" type="text" placeholder="Tag name" autoFocus={true} onChange={handleTagNameChanges}/>
    <div className="colorgrid">
      {
          colorList.map((element, index) => {
            return (
              <div
                key={index}
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
    <button className="btn-success" onClick={createTag}>Ok</button>
  </div>
}
