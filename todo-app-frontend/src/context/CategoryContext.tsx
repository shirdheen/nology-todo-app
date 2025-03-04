import { createContext, useContext, useEffect, useState } from "react";
import { addCategory, getCategories } from "../services/category-service";

interface Category {
  id: number;
  name: string;
}

interface CategoryContextType {
  categories: Category[];
  addNewCategory: (categoryName: string) => Promise<void>;
  refreshCategories: () => Promise<void>;
}

const CategoryContext = createContext<CategoryContextType | undefined>(
  undefined
);

export const useCategoryContext = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error(
      "useCategoryContext must be used within a CategoryProvider"
    );
  }
  return context;
};

export const CategoryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    refreshCategories();
  }, []);

  const refreshCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  const addNewCategory = async (categoryName: string) => {
    if (!categoryName.trim()) return;
    console.log("Adding new category: ", categoryName);
    const addedCategory = await addCategory(categoryName);

    if (addedCategory) {
      setCategories((prev) => [...prev, addedCategory]);
    }
  };

  return (
    <CategoryContext.Provider
      value={{ categories, addNewCategory, refreshCategories }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
