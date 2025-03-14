import React, { useEffect, useState } from "react";
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
      completed: boolean;
    }[]
  >([]);

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  useEffect(() => {
    fetchTodos(selectedCategory ?? undefined).then((data) => {
      console.log("Filtered todos: ", data);
      setTodos(data);
    });
  }, [selectedCategory]);

  const handleAddTodo = async (taskName: string, categoryId: number) => {
    const newTodo = await createTodo(taskName, categoryId);
    setTodos((prev) => [...prev, newTodo]);
  };

  const handleUpdateTodo = async (
    id: number,
    taskName: string,
    categoryId: number,
    completed: boolean
  ) => {
    const updatedTodo = await updateTodo(id, taskName, categoryId, completed);
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? updatedTodo : todo))
    );
  };

  const handleArchiveTodo = async (id: number) => {
    await archiveTodo(id);
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleDuplicateTodo = async (taskName: string, categoryId: number) => {
    const newTodo = await createTodo(taskName, categoryId);
    setTodos((prev) => [...prev, newTodo]);
  };

  const handleFilterChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const categoryId = event.target.value ? Number(event.target.value) : null;
    console.log("Selected category ID:", categoryId);
    setSelectedCategory(categoryId);
  };

  return (
    <div className={styles.todoListContainer}>
      <h2 className={styles.heading}>To Do's</h2>

      <div className={styles.filterContainer}>
        <span>Filter by: </span>
        <select onChange={handleFilterChange} value={selectedCategory ?? ""}>
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <TodoForm onAddTodo={handleAddTodo} categories={categories} />

      {todos.map((todo) => (
        <TodoItem
          key={todo.id ?? todo.taskName}
          todo={todo}
          categories={categories}
          onArchive={handleArchiveTodo}
          onUpdate={handleUpdateTodo}
          onDuplicate={handleDuplicateTodo}
        />
      ))}
    </div>
  );
};

export default TodoList;
