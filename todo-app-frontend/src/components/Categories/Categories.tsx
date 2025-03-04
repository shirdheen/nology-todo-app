import { useEffect, useState } from "react";
import styles from "./Category.module.scss";
import CategoryButton from "./CategoryButton";
import { useCategoryContext } from "../../context/CategoryContext";

const Categories = () => {
  const { categories, addNewCategory } = useCategoryContext();
  const [newCategory, setNewCategory] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleAddCategory = async () => {
    if (newCategory.trim() === "") return;
    await addNewCategory(newCategory);
    setNewCategory("");
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

      <div className={styles.addCategory}>
        <input
          type="text"
          placeholder="Enter category..."
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button
          className={styles.categoryAddButton}
          onClick={handleAddCategory}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default Categories;
