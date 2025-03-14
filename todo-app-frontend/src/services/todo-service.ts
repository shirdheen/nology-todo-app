const API_URL = "https://nology-todo-app.onrender.com/todos";

export const fetchTodos = async (categoryId?: number) => {
  try {
    const url = categoryId ? `${API_URL}?categoryId=${categoryId}` : API_URL;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to  fetch todos");

    return await response.json();
  } catch (error) {
    console.error("Error fetching todos:", error);
    return [];
  }
};

export const createTodo = async (taskName: string, categoryId: number) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ taskName, categoryId }),
    });
    if (!response.ok) throw new Error("Failed to create todo");
    return await response.json();
  } catch (error) {
    console.error("Error creating todo:", error);
  }
};

export const updateTodo = async (
  id: number,
  taskName: string,
  categoryId: number,
  completed: boolean
) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ taskName, categoryId, completed }),
    });

    if (!response.ok) throw new Error("Failed to update todo");
    return await response.json();
  } catch (error) {
    console.error("Error updating todo:", error);
    return null;
  }
};

export const archiveTodo = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Failed to archive todo");
  } catch (error) {
    console.error("Error  archiving todo:", error);
  }
};
