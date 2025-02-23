package com.shirdheen.todos.to_dos_app_project.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shirdheen.todos.to_dos_app_project.dto.todo.ToDoDTO;
import com.shirdheen.todos.to_dos_app_project.dto.todo.ToDoRequestDTO;
import com.shirdheen.todos.to_dos_app_project.services.ToDoService;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/todos")
public class ToDoController {
    private final ToDoService todoService;

    public ToDoController(ToDoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping
    public ResponseEntity<List<ToDoDTO>> getAllTodos(@RequestParam(required = false) Long category) {
        return category == null ? ResponseEntity.ok(todoService.getAllTodos())
                : ResponseEntity.ok(todoService.getTodosByCategory(category));
    }

    @PostMapping
    public ResponseEntity<ToDoDTO> createTodo(@RequestBody ToDoRequestDTO requestDTO) {
        return ResponseEntity.ok(todoService.createTodo(requestDTO.getTaskName(), requestDTO.getCategoryId()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ToDoDTO> updateTodo(@PathVariable Long id, @RequestBody ToDoRequestDTO requestDTO) {
        return ResponseEntity.ok(
                todoService.updateTodo(id, requestDTO.getTaskName(), requestDTO.getCategoryId(), requestDTO.isCompleted()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> archiveTodo(@PathVariable Long id) {
        todoService.archiveTodo(id);
        return ResponseEntity.ok("ToDo archived");
    }

    @GetMapping("/archived")
    public ResponseEntity<List<ToDoDTO>> getArchivedTodos(@RequestParam(required = false) Long category) {
        return category == null ? ResponseEntity.ok(todoService.getArchivedTodos()) : ResponseEntity.ok(todoService.getArchivedTodosByCategory(category));
    }
}
