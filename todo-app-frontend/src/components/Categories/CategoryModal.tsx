import { useState } from "react";
import {
  deleteCategory,
  updateCategory,
} from "../../services/category-service";
import styles from "./Category.module.scss";
import Modal from "../../subcomponents/Modal/Modal";

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
    console.log("Attempting to delete category ID:", category.id);
    const result = await deleteCategory(category.id);
    if (!result.success) {
      alert(result.message);
      return;
    }

    onCategoryUpdated();
    onClose();
  };

  return (
    <Modal
      title="Edit Category"
      onClose={onClose}
      actions={
        <>
          <button onClick={handleUpdate} className={styles.saveButton}>
            Save
          </button>
          <button onClick={handleDelete} className={styles.deleteButton}>
            Delete
          </button>
        </>
      }
    >
      <input
        type="text"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        className={styles.modalInput}
      />
    </Modal>
  );
};

export default CategoryModal;
