import { useEffect, useState } from "react";
import TodoModal from "./ToDoModal";
import styles from "./ToDo.module.scss";

interface TodoItemProps {
  todo: {
    id: number;
    taskName: string;
    category: { id: number; name: string };
    isCompleted: boolean;
  };
  categories: { id: number; name: string }[];
  onArchive: (id: number) => void;
  onUpdate: (id: number, taskName: string, categoryId: number) => void;
}

const TodoItem = ({ todo, categories, onArchive, onUpdate }: TodoItemProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(todo.category);

  useEffect(() => {
    setSelectedCategory(todo.category);
  }, [todo.category]);

  return (
    <div className={styles.todoItem}>
      <span className={styles.taskName}>{todo.taskName}</span>

      <span className={styles.category}>
        {selectedCategory?.name || "No category"}
      </span>

      <div className={styles.actions}>
        <button className={styles.edit} onClick={() => setIsModalOpen(true)}>
          <i className="fa-solid fa-pen-to-square"></i>
        </button>
        <button className={styles.archive} onClick={() => onArchive(todo.id)}>
          Archive
        </button>
      </div>

      {isModalOpen && (
        <TodoModal
          todo={{ ...todo, categoryId: todo.category.id }}
          categories={categories}
          onClose={() => setIsModalOpen(false)}
          onUpdate={(id, taskName, categoryId) => {
            onUpdate(id, taskName, categoryId);
            const updatedCategory = categories.find((c) => c.id === categoryId);
            if (updatedCategory) {
              setSelectedCategory(updatedCategory);
            }
          }}
        />
      )}
    </div>
  );
};

export default TodoItem;
