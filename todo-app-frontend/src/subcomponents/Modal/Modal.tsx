import { ReactNode } from "react";
import styles from "./Modal.module.scss";
import ReactDOM from "react-dom";

interface ModalProps {
  title: string;
  children: ReactNode;
  onClose: () => void;
}

const Modal = ({ title, children, onClose }: ModalProps) => {
  return ReactDOM.createPortal(
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3 className={styles.modalHeading}>{title}</h3>
        <div className={styles.modalBody}>{children}</div>
        <div className={styles.modalActions}>
          <button onClick={onClose} className={styles.cancelButton}>
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
