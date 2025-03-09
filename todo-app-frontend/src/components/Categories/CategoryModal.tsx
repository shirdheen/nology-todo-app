import { useState } from "react";
import {
  deleteCategory,
  updateCategory,
} from "../../services/category-service";
import styles from "./Category.module.scss";
import ReactDOM from "react-dom";

interface ModalProps {
  category: { id: number; name: string };
  onClose: () => void;
  onCategoryUpdated: () => void;
}

const CategoryModal = ({
  category,
  onClose,
  onCategoryUpdated,
}: ModalProps) => {
  const [newName, setNewName] = useState(category.name);

  const handleUpdate = async () => {
    await updateCategory(category.id, newName);
    onCategoryUpdated();
    onClose();
  };

  const handleDelete = async () => {
    const result = await deleteCategory(category.id);
    if (!result.success) {
      alert(result.message);
      return;
    }

    onCategoryUpdated();
    onClose();
  };

  return ReactDOM.createPortal(
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3 className={styles.modalHeading}>Edit Category</h3>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className={styles.modalInput}
        />
        <div className={styles.modalActions}>
          <button onClick={handleUpdate} className={styles.saveButton}>
            Save
          </button>
          <button onClick={handleDelete} className={styles.deleteButton}>
            Delete
          </button>
          <button onClick={onClose} className={styles.cancelButton}>
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default CategoryModal;
