/*
  * Here are the component regrouping actions that can be done
  * according to the selected menu/submenu in the sidebar
*/
import { useAtom } from "jotai";
import { RiPushpinLine, RiRecycleFill, RiRefreshLine, RiUnpinLine } from "react-icons/ri";
import { selectedNoteAtom } from "../hooks/editor";
import { FaRegTrashCan } from "react-icons/fa6";
import { LuFileSignature } from "react-icons/lu";

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

export const AllNotesActions = ({createNoteModal, deleteNoteModal}) => {
  const [selectedNote] = useAtom(selectedNoteAtom);
  return (
    <>
        <button onClick={() => createNoteModal(true)}>
          <LuFileSignature size={15} />
        </button>
      {
        selectedNote != null ?
        <button onClick={() => deleteNoteModal(true)}>
          <FaRegTrashCan size={15} />
        </button> : null
      }
    </>
  )
}

export const TrashNotesActions = (props) => {
  const [selectedNote] = useAtom(selectedNoteAtom);
  return (
    <>
    <button>
    <RiRecycleFill size={15}/>
    </button>
    <div className="section-2">

      {
        selectedNote ? <button>
        <RiRefreshLine size={15} />
        </button> : null
      }
      {
        selectedNote ? <button><FaRegTrashCan size={15} /></button> : null
      }
    </div>

    </>
  );
}

export const NotebookActions = ({createNoteModal, deleteNoteModal}) => {

  const [selectedNote] = useAtom(selectedNoteAtom);
  return (
    <>
      <button onClick={() => createNoteModal(true)}>
        <LuFileSignature size={15} />
      </button>
      {
        selectedNote ?
        <>
          <button><RiPushpinLine /> </button>
          <button onClick={() => deleteNoteModal(true)}>
            <FaRegTrashCan size={15} />
          </button>
        </> : null
      }
    </>
  );
}
