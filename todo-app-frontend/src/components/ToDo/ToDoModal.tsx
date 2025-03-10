import { useState } from "react";
import styles from "./ToDo.module.scss";
import ReactDOM from "react-dom";

interface TodoModalProps {
  todo: {
    id: number;
    taskName: string;
    categoryId: number;
    completed: boolean;
  };
  categories: { id: number; name: string }[];
  onClose: () => void;
  onUpdate: (
    id: number,
    taskName: string,
    categoryId: number,
    completed: boolean
  ) => void;
}

const TodoModal = ({ todo, categories, onClose, onUpdate }: TodoModalProps) => {
  const [taskName, setTaskName] = useState(todo.taskName);
  const [categoryId, setCategoryId] = useState(todo.categoryId);
  const [completed, setcompleted] = useState(todo.completed ?? false);

  const handleSave = () => {
    onUpdate(todo.id, taskName, categoryId, completed);
    onClose();
  };

  return ReactDOM.createPortal(
    <div className={styles.todoModalOverlay}>
      <div className={styles.todoModalContent}>
        <h3 className={styles.todoModalHeading}>Edit To Do</h3>
        <input
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className={styles.todoModalInput}
        />
        <select
          className={styles.todoModalSelect}
          value={categoryId}
          onChange={(e) => setCategoryId(Number(e.target.value))}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <div>
          <label className={styles.completedLabel}>
            <input
              type="checkbox"
              checked={completed}
              onChange={(e) => setcompleted(e.target.checked)}
              className={styles.todoCheckboxModal}
            />
            Mark as completed
          </label>
        </div>
        <div className={styles.todoModalActions}>
          <button onClick={handleSave} className={styles.saveButton}>
            Save
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

export default TodoModal;
