import React from "react";
import ReactDOM from "react-dom";

import { AnimationProps, motion } from "framer-motion";

const animations: AnimationProps = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

const Modal = ({
  children,
  title,
  onConfirm,
  onClose,
}: {
  children: React.ReactNode;
  title: string;
  onConfirm: () => void;
  onClose: () => void;
}) => {
  return ReactDOM.createPortal(
    <motion.div className="modal__container" {...animations}>
      <h6 className="modal__title">{title}</h6>
      <div className="modal__content">{children}</div>
      <div className="modal__actions">
        <button onClick={onConfirm} className="modal__action">
          CREATE
        </button>
        <button onClick={onClose} className="modal__action">
          CANCEL
        </button>
      </div>
    </motion.div>,
    document.getElementById("modal") as HTMLElement
  );
};

export default Modal;
