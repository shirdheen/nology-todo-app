package com.shirdheen.todos.to_dos_app_project.dto.todo;

import com.shirdheen.todos.to_dos_app_project.dto.category.CategoryDTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ToDoDTO {
    private Long id;
    private String taskName;
    private boolean isCompleted;
    private boolean isArchived;
    private CategoryDTO category;

}
