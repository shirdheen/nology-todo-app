package com.shirdheen.todos.to_dos_app_project.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.shirdheen.todos.to_dos_app_project.dto.DTOMapper;
import com.shirdheen.todos.to_dos_app_project.dto.todo.ToDoDTO;
import com.shirdheen.todos.to_dos_app_project.entities.Category;
import com.shirdheen.todos.to_dos_app_project.entities.ToDo;
import com.shirdheen.todos.to_dos_app_project.repositories.CategoryRepository;
import com.shirdheen.todos.to_dos_app_project.repositories.ToDoRepository;

@Service
public class ToDoService {
    private final ToDoRepository todoRepository;
    private final CategoryRepository categoryRepository;

    public ToDoService(ToDoRepository toDoRepository, CategoryRepository categoryRepository) {
        this.todoRepository = toDoRepository;
        this.categoryRepository = categoryRepository;
    }

    public List<ToDoDTO> getAllTodos() {
        return todoRepository.findByIsArchivedFalse().stream().map(DTOMapper::toToDoDTO).collect(Collectors.toList());
    }

    public List<ToDoDTO> getTodosByCategory(Long categoryId) {
        boolean categoryExists = categoryRepository.existsById(categoryId);
        if (!categoryExists) {
            throw new RuntimeException("Category not found.");
        }

        return todoRepository.findByCategoryIdAndIsArchivedFalse(categoryId).stream().map(DTOMapper::toToDoDTO)
                .collect(Collectors.toList());
    }

    public ToDoDTO createTodo(String taskName, Long categoryId) {
        if (taskName == null || taskName.trim().isEmpty()) {
            throw new IllegalArgumentException("Task name cannot be empty.");
        }

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new DataIntegrityViolationException("Category not found."));

        ToDo todo = new ToDo(taskName, category);
        todoRepository.save(todo);
        return DTOMapper.toToDoDTO(todo);
    }

    public ToDoDTO updateTodo(Long id, String taskName, Long categoryId, boolean completed) {
        ToDo todo = todoRepository.findById(id).orElseThrow(() -> new RuntimeException("ToDo not found."));

        if (taskName == null || taskName.trim().isEmpty()) {
            throw new IllegalArgumentException("Task name cannot be empty.");
        }

        todo.setTaskName(taskName);
        todo.setCompleted(completed);

        if (categoryId != null) {
            Category category = categoryRepository.findById(categoryId)
                    .orElseThrow(() -> new DataIntegrityViolationException("Category not found"));
            todo.setCategory(category);
        }

        todoRepository.save(todo);
        return DTOMapper.toToDoDTO(todo);
    }

    public void archiveTodo(Long id) {
        ToDo todo = todoRepository.findById(id).orElseThrow(() -> new RuntimeException("Todo not found"));

        todo.setArchived(true);
        todoRepository.save(todo);
    }

    public List<ToDoDTO> getArchivedTodos() {
        return todoRepository.findByIsArchivedTrue().stream().map(DTOMapper::toToDoDTO).collect(Collectors.toList());
    }

    public List<ToDoDTO> getArchivedTodosByCategory(Long categoryId) {
        boolean categoryExists = categoryRepository.existsById(categoryId);
        if (!categoryExists) {
            throw new RuntimeException("Category not found.");
        }
        return todoRepository.findByCategoryIdAndIsArchivedTrue(categoryId).stream().map(DTOMapper::toToDoDTO)
                .collect(Collectors.toList());
    }

}
