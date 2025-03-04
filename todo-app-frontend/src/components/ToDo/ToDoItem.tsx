import { useEffect, useState } from "react";
import TodoModal from "./ToDoModal";
import styles from "./ToDo.module.scss";

interface TodoItemProps {
  todo: {
    id: number;
    taskName: string;
    category: { id: number; name: string };
    completed: boolean;
  };
  categories: { id: number; name: string }[];
  onArchive: (id: number) => void;
  onUpdate: (
    id: number,
    taskName: string,
    categoryId: number,
    completed: boolean
  ) => void;
  onDuplicate: (taskName: string, categoryId: number) => void;
}

const TodoItem = ({
  todo,
  categories,
  onArchive,
  onUpdate,
  onDuplicate,
}: TodoItemProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(todo.category);
  const [completed, setcompleted] = useState(todo.completed ?? false);

  useEffect(() => {
    setSelectedCategory(todo.category);
    setcompleted(todo.completed ?? false);
  }, [todo.category, todo.completed]);

  const handleCheckboxChange = () => {
    const newCompletedStatus = !completed;
    setcompleted(newCompletedStatus);
    onUpdate(todo.id, todo.taskName, selectedCategory.id, newCompletedStatus);
  };

  return (
    <div className={styles.todoItem}>
      <section className={styles.section}>
        <input
          type="checkbox"
          checked={completed}
          onChange={handleCheckboxChange}
          className={styles.todoCheckbox}
        />
        <span className={styles.taskName}>{todo.taskName}</span>
      </section>

      <section className={styles.section}>
        <span className={styles.category}>
          {selectedCategory?.name || "No category"}
        </span>
        <div className={styles.actions}>
          <button className={styles.edit} onClick={() => setIsModalOpen(true)}>
            <i className="fa-solid fa-pen-to-square"></i>
          </button>

          <button
            onClick={() => onDuplicate(todo.taskName, selectedCategory.id)}
            className={styles.duplicate}
          >
            Duplicate
          </button>

          <button className={styles.archive} onClick={() => onArchive(todo.id)}>
            Archive
          </button>
        </div>
      </section>

      {isModalOpen && (
        <TodoModal
          todo={{ ...todo, categoryId: todo.category.id }}
          categories={categories}
          onClose={() => setIsModalOpen(false)}
          onUpdate={(id, taskName, categoryId, completed) => {
            onUpdate(id, taskName, categoryId, completed);
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
