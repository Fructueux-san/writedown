import React, { useEffect, useRef } from "react";
import "../assets/modal.css";

function Modal ({openModal, closeModal, children, action='Test', actionCallback,title="Alert", type="danger", actionBtnStyle={}}) {
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
      <div className="title">{title}</div>
      <div className="modal-content">
        { children }
      </div>
      <div className="btn-row">
        <button onClick={closeModal}>
          Annuler
        </button>
        <button onClick={actionCallback} style={actionBtnStyle} className={type}>
          {action}
        </button>
      </div>
    </dialog>
  );
}

export default Modal;
