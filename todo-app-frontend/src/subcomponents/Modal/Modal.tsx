import { ReactNode } from "react";
import styles from "./Modal.module.scss";
import ReactDOM from "react-dom";
import ModalActions from "../ModalActions/ModalActions";

interface ModalProps {
  title: string;
  children: ReactNode;
  onClose: () => void;
  actions: React.ReactNode;
}

const Modal = ({ title, children, onClose, actions }: ModalProps) => {
  return ReactDOM.createPortal(
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3 className={styles.modalHeading}>{title}</h3>
        <div className={styles.modalBody}>{children}</div>
        <ModalActions onClose={onClose}>{actions}</ModalActions>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
