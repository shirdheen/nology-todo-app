import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./ToDo.module.scss";

interface TodoFormProps {
  onAddTodo: (taskName: string, categoryId: number) => void;
  categories: { id: number; name: string }[];
}

interface FormInputs {
  taskName: string;
  categoryId: number;
}

const TodoForm = ({ onAddTodo, categories }: TodoFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    onAddTodo(data.taskName, Number(data.categoryId));
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.todoFormContainer}
    >
      <input
        {...register("taskName", { required: "Task name is required" })}
        placeholder="Add todo here..."
        className={`${styles.todoInput} ${
          errors.taskName ? styles.inputError : ""
        }`}
      />
      {errors.taskName && (
        <span className={styles.errorMessage}>{errors.taskName.message}</span>
      )}

      <select
        {...register("categoryId", { required: "Category is required" })}
        className={`${styles.categorySelect} ${
          errors.categoryId ? styles.inputError : ""
        }`}
      >
        <option value="">Select Category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      {errors.categoryId && (
        <span className={styles.errorMessage}>{errors.categoryId.message}</span>
      )}

      <button type="submit" className={styles.addButton}>
        Add
      </button>
    </form>
  );
};

export default TodoForm;
