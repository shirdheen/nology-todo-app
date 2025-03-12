import { useState } from "react";
import styles from "./ToDo.module.scss";
import Modal from "../../subcomponents/Modal/Modal";

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

  return (
    <Modal
      title="Edit To Do"
      onClose={onClose}
      actions={
        <>
          <button onClick={handleSave} className={styles.saveButton}>
            Save
          </button>
        </>
      }
    >
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
    </Modal>
  );
};

export default TodoModal;
