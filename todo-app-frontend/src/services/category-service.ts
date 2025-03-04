const API_URL = "http://localhost:8080/categories";

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
    if (!response.ok) throw new Error("Oops, failed to add category");
    return await response.json();
  } catch (error) {
    console.error("Error adding category:", error);
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
    if (!response.ok) throw new Error("Oops, failed to delete category");
  } catch (error) {
    console.error("Error deleting category:", error);
  }
};
