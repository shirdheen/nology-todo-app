package com.shirdheen.todos.to_dos_app_project.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shirdheen.todos.to_dos_app_project.dto.todo.ToDoDTO;
import com.shirdheen.todos.to_dos_app_project.dto.todo.ToDoRequestDTO;
import com.shirdheen.todos.to_dos_app_project.services.ToDoService;

import java.util.List;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;

@CrossOrigin(origins = "https://shirdheen.github.io")
@RestController
@RequestMapping("/todos")
public class ToDoController {
    private final ToDoService todoService;

    public ToDoController(ToDoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping
    public ResponseEntity<?> getAllTodos(@RequestParam(required = false) Long categoryId) {
        try {
            System.out.println("Received category filter: " + categoryId);

            List<ToDoDTO> todos = (categoryId != null) ? todoService.getTodosByCategory(categoryId)
                    : todoService.getAllTodos();

            System.out.println("Filtered todos count: " + todos.size());
            return ResponseEntity.ok(todos);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to fetch todos.");
        }

    }

    @PostMapping
    public ResponseEntity<?> createTodo(@RequestBody ToDoRequestDTO requestDTO) {
        try {
            return ResponseEntity.ok(todoService.createTodo(requestDTO.getTaskName(), requestDTO.getCategoryId()));
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Category is invalid or does not exist");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create todo.");
        }

    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTodo(@PathVariable Long id, @RequestBody ToDoRequestDTO requestDTO) {
        try {
            return ResponseEntity.ok(
                    todoService.updateTodo(id, requestDTO.getTaskName(), requestDTO.getCategoryId(),
                            requestDTO.isCompleted()));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update todo.");
        }

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> archiveTodo(@PathVariable Long id) {
        try {
            todoService.archiveTodo(id);
            return ResponseEntity.ok("ToDo archived");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to archive todo.");
        }

    }

    @GetMapping("/archived")
    public ResponseEntity<?> getArchivedTodos(@RequestParam(required = false) Long category) {
        try {
            return category == null ? ResponseEntity.ok(todoService.getArchivedTodos())
                    : ResponseEntity.ok(todoService.getArchivedTodosByCategory(category));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to fetch archived todos.");
        }

    }
}
