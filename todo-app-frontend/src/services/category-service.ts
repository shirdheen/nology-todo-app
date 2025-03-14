const API_URL = "https://nology-todo-app.onrender.com/categories";

export const fetchCategories = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const getCategories = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Oops, failed to fetch categories");
    return await response.json();
  } catch (error) {
    console.error("Error fetching categories: ", error);
    return [];
  }
};

export const addCategory = async (name: string) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    if (!response.ok) {
      const errorMessage = await response.text();
      return {
        success: false,
        message: errorMessage || "Oops, failed to add category",
      };
    }
    const category = await response.json();
    return { success: true, category };
  } catch (error) {
    console.error("Error adding category:", error);
    return {
      success: false,
      message: (error as Error).message || "An error occurred",
    };
  }
};

export const updateCategory = async (id: number, name: string) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    if (!response.ok) throw new Error("Oops, failed to update category");
    return await response.json();
  } catch (error) {
    console.error("Error updating category:", error);
  }
};

export const deleteCategory = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || "Failed to delete category");
    }

    return { success: true };
  } catch (error) {
    console.error("Error deleting category:", error);

    let errorMessage = "An unknown error has occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return { success: false, message: errorMessage };
  }
};
