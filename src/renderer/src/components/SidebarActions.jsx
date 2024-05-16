/*
  * Here are the component regrouping actions that can be done
  * according to the selected menu/submenu in the sidebar
*/
import React from "react";
import { useAtom } from "jotai";
import { RiUnpinLine } from "react-icons/ri";
import { selectedNoteAtom } from "../hooks/editor";
import { FaRegTrashCan } from "react-icons/fa6";

export const PinnedNotesAction = (props) => {
  const [selectedNote] = useAtom(selectedNoteAtom);
  return (
    <>
      {
        selectedNote != null ?
          <button>
            <RiUnpinLine size={15} />
          </button> : null

      }
      {
        selectedNote != null ?
        <button>
          <FaRegTrashCan size={15} />
        </button> : null
      }
    </>
  );
}

export const allNotesActions = (props) => {

}

export const trashNotesActions = (props) => {

}

export const notebookActions = (props) => {

}
