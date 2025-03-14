import { useEffect, useState } from "react";
import styles from "./Category.module.scss";
import CategoryButton from "./CategoryButton";
import { useCategoryContext } from "../../context/CategoryContext";
import { useForm } from "react-hook-form";

const Categories = () => {
  const { categories, addNewCategory } = useCategoryContext();
  // const [newCategory, setNewCategory] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ categoryName: string }>();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleAddCategory = async (data: { categoryName: string }) => {
    setServerError(null);

    const result = await addNewCategory(data.categoryName);

    if (!result.success) {
      setServerError(result.message || "An unexpected error has occurred");
    } else {
      reset();
    }
  };

  return (
    <div
      className={`${styles.categoriesContainer} ${
        isMounted ? styles.fadeInCont : ""
      }`}
    >
      <h2 className={styles.heading}>Categories</h2>
      <div className={styles.categoryButtons}>
        {categories.map((category) => (
          <CategoryButton
            key={category.id ?? category.name}
            category={category}
          />
        ))}
      </div>

      <form
        onSubmit={handleSubmit(handleAddCategory)}
        className={styles.addCategory}
      >
        <input
          type="text"
          placeholder="Enter category..."
          {...register("categoryName", {
            required: "Category name is required",
          })}
          className={`${styles.inputField} ${
            errors.categoryName || serverError ? styles.inputError : ""
          }`}
        />
        <button type="submit" className={styles.categoryAddButton}>
          Add
        </button>
      </form>
      {errors.categoryName && (
        <span className={styles.errorMessage}>
          {errors.categoryName.message}
        </span>
      )}

      {serverError && (
        <span className={styles.errorMessage}>{serverError}</span>
      )}
    </div>
  );
};

export default Categories;
