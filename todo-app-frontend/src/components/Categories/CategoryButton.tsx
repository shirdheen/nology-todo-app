import { useState } from "react";
import styles from "./Category.module.scss";
import CategoryModal from "./CategoryModal";

interface CategoryProps {
  category: { id: number; name: string };
  onCategoryUpdated: () => void;
}

const CategoryButton = ({ category, onCategoryUpdated }: CategoryProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          onCategoryUpdated={onCategoryUpdated}
        />
      )}
    </>
  );
};

export default CategoryButton;
