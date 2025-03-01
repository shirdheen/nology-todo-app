import { useEffect, useState } from "react";
import styles from "./Category.module.scss";
import { addCategory, getCategories } from "../../services/category-service";
import CategoryButton from "./CategoryButton";

const Categories = () => {
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );
  const [newCategory, setNewCategory] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    fetchCategories();
    setIsMounted(true);
  }, []);

  const fetchCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  const handleAddCategory = async () => {
    if (newCategory.trim() === "") return;
    const addedCategory = await addCategory(newCategory);
    if (addedCategory) {
      setCategories([...categories, addedCategory]);
      setNewCategory("");
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
            key={category.id}
            category={category}
            onCategoryUpdated={fetchCategories}
          />
        ))}
      </div>

      <div className={styles.addCategory}>
        <input
          type="text"
          placeholder="Enter category..."
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button onClick={handleAddCategory}>Add</button>
      </div>
    </div>
  );
};

export default Categories;
