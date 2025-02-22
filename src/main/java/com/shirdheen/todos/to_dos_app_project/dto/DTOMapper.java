package com.shirdheen.todos.to_dos_app_project.dto;

import com.shirdheen.todos.to_dos_app_project.dto.category.CategoryDTO;
import com.shirdheen.todos.to_dos_app_project.dto.todo.ToDoDTO;
import com.shirdheen.todos.to_dos_app_project.entities.Category;
import com.shirdheen.todos.to_dos_app_project.entities.ToDo;

public class DTOMapper {
    public static CategoryDTO toCategoryDTO(Category category) {
        return new CategoryDTO(category.getId(), category.getName());
    }

    public static ToDoDTO toToDoDTO(ToDo todo) {
        return new ToDoDTO(
                todo.getId(),
                todo.getTaskName(),
                todo.isCompleted(),
                todo.isArchived(),
                toCategoryDTO(todo.getCategory()));
    }
}