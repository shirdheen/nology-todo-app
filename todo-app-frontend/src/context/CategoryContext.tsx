import { createContext, useContext, useEffect, useState } from "react";
import { addCategory, getCategories } from "../services/category-service";

interface Category {
  id: number;
  name: string;
}

interface CategoryContextType {
  categories: Category[];
  addNewCategory: (
    categoryName: string
  ) => Promise<{ success: boolean; message?: string }>;
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
    if (!categoryName.trim())
      return { success: false, message: "Category name cannot be empty" };
    console.log("Adding new category: ", categoryName);
    const result = await addCategory(categoryName);

    if (result.success) {
      setCategories((prev) => [
        ...prev,
        { id: Date.now(), name: categoryName },
      ]);
    }

    return result;
  };

  return (
    <CategoryContext.Provider
      value={{ categories, addNewCategory, refreshCategories }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
