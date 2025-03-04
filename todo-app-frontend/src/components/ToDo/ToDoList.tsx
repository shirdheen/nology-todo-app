import { useEffect, useState } from "react";
import {
  archiveTodo,
  createTodo,
  fetchTodos,
  updateTodo,
} from "../../services/todo-service";
import TodoForm from "./ToDoForm";
import TodoItem from "./ToDoItem";
import styles from "./ToDo.module.scss";
import { useCategoryContext } from "../../context/CategoryContext";

const TodoList = () => {
  const { categories } = useCategoryContext();

  const [todos, setTodos] = useState<
    {
      id: number;
      taskName: string;
      category: { id: number; name: string };
      isCompleted: boolean;
    }[]
  >([]);

  useEffect(() => {
    fetchTodos().then(setTodos);
  }, []);

  const handleAddTodo = async (taskName: string, categoryId: number) => {
    const newTodo = await createTodo(taskName, categoryId);
    setTodos((prev) => [...prev, newTodo]);
  };

  const handleUpdateTodo = async (
    id: number,
    taskName: string,
    categoryId: number
  ) => {
    const updatedTodo = await updateTodo(id, taskName, categoryId);
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? updatedTodo : todo))
    );
  };

  const handleArchiveTodo = async (id: number) => {
    await archiveTodo(id);
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div className={styles.todoListContainer}>
      <h2 className={styles.heading}>To Do's</h2>
      <TodoForm onAddTodo={handleAddTodo} categories={categories} />
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          categories={categories}
          onArchive={handleArchiveTodo}
          onUpdate={handleUpdateTodo}
        />
      ))}
    </div>
  );
};

export default TodoList;
