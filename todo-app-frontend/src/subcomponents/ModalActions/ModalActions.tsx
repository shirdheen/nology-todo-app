import styles from "./ModalActions.module.scss";

interface ModalActionProps {
  children: React.ReactNode;
  onClose: () => void;
}

const ModalActions = ({ children, onClose }: ModalActionProps) => {
  return (
    <div className={styles.modalActions}>
      {children}
      <button onClick={onClose} className={styles.closeButton}>
        Close
      </button>
    </div>
  );
};

export default ModalActions;
