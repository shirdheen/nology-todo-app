import { useState } from "react";

interface TodoModalProps {
  todo: { id: number; taskName: string; categoryId: number };
  categories: { id: number; name: string }[];
  onClose: () => void;
  onUpdate: (id: number, taskName: string, categoryId: number) => void;
}

const TodoModal = ({ todo, categories, onClose, onUpdate }: TodoModalProps) => {
  const [taskName, setTaskName] = useState(todo.taskName);
  const [categoryId, setCategoryId] = useState(todo.categoryId);

  const handleSave = () => {
    onUpdate(todo.id, taskName, categoryId);
    onClose();
  };

  return (
    <div>
      <div>
        <h3>Edit To Do</h3>
        <input value={taskName} onChange={(e) => setTaskName(e.target.value)} />
        <select
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
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default TodoModal;
