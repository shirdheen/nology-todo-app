package com.shirdheen.todos.to_dos_app_project.dto.todo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ToDoRequestDTO {
    private String taskName;
    private boolean isCompleted;
    private Long categoryId;

}
