import { useState } from "react";
import styles from "./Category.module.scss";
import CategoryModal from "./CategoryModal";
import { useCategoryContext } from "../../context/CategoryContext";

interface CategoryProps {
  category: { id: number; name: string };
}

const CategoryButton = ({ category }: CategoryProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { refreshCategories } = useCategoryContext();

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={styles.categoryButton}
      >
        {category.name}
      </button>

      {isModalOpen && (
        <CategoryModal
          category={category}
          onClose={() => setIsModalOpen(false)}
          onCategoryUpdated={refreshCategories}
        />
      )}
    </>
  );
};

export default CategoryButton;
