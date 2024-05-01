import React from "react";
import "../assets/sidebar.css";
import {LuFileSignature} from "react-icons/lu";
import {FaRegTrashCan} from "react-icons/fa6";
import { notes } from "../utils/constants";
import { formatDateFromMs } from "../utils/helpers";
const Content = ({title, lastEdit}) => {
    var date = formatDateFromMs(lastEdit);
    return (
      <li className="content">
        <div className="title">{title}</div>
        <p>
          {date}
        </p>
      </li>
    );
}


const SideBar = (props) => {

  return (
    <div className="sidebar">
      <div className="actions">
        <button>
          <LuFileSignature size={15} />
        </button>

        <button>
          <FaRegTrashCan size={15} />
        </button>
      </div>
      <ul className="sidebar-content">
        {
          notes.map(element => <Content title={element.title} lastEdit={element.lastEditTime} />)
        }
      </ul>
    </div>
  );

}

export default SideBar;
