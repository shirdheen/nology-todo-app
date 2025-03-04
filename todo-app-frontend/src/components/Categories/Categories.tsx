import { useEffect, useState } from "react";
import styles from "./Category.module.scss";
import CategoryButton from "./CategoryButton";
import { useCategoryContext } from "../../context/CategoryContext";
import { useForm } from "react-hook-form";

const Categories = () => {
  const { categories, addNewCategory } = useCategoryContext();
  // const [newCategory, setNewCategory] = useState("");
  const [isMounted, setIsMounted] = useState(false);

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
    await addNewCategory(data.categoryName);
    reset();
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
          <CategoryButton key={category.id} category={category} />
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
            errors.categoryName ? styles.inputError : ""
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
    </div>
  );
};

export default Categories;
