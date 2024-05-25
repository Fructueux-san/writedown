import React, { useEffect, useRef } from "react";
import "../assets/modal.css";
import { FaXmark } from "react-icons/fa6";

function Modal ({openModal, closeModal, children, action='Test', actionCallback,title="Alert", type="danger", withActionBar=true, actionBtnStyle={}}) {
  const ref = useRef();
  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
    }else {
      ref.current?.close();
    }
  }, [openModal, closeModal]);

  return (
    <dialog ref={ref} className="modal" onClose={closeModal}>
      {
        !withActionBar ?
          <div className="x-close-mark" onClick={closeModal}>
            <FaXmark />
          </div>: null}
      <div className="title">{title}</div>
      <div className="modal-content">
        { children }
      </div>
      {
        withActionBar ?
          <div className="btn-row">
            <button onClick={closeModal}>
            Annuler
            </button>
            <button onClick={actionCallback} style={actionBtnStyle} className={type}>
              {action}
            </button>
        </div>: null
      }
    </dialog>
  );
}

export default Modal;
