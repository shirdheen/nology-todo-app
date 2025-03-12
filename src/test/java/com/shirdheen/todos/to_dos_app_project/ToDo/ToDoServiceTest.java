package com.shirdheen.todos.to_dos_app_project.ToDo;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.shirdheen.todos.to_dos_app_project.dto.todo.ToDoDTO;
import com.shirdheen.todos.to_dos_app_project.entities.Category;
import com.shirdheen.todos.to_dos_app_project.entities.ToDo;
import com.shirdheen.todos.to_dos_app_project.repositories.CategoryRepository;
import com.shirdheen.todos.to_dos_app_project.repositories.ToDoRepository;
import com.shirdheen.todos.to_dos_app_project.services.ToDoService;

public class ToDoServiceTest {

    @Mock
    private ToDoRepository toDoRepository;

    @Mock
    private CategoryRepository categoryRepository;

    @InjectMocks
    private ToDoService toDoService;

    private ToDo sampleToDo;
    private Category sampleCategory;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        sampleCategory = new Category(1L, "Work");
        sampleToDo = new ToDo(1L, "Test task", false, false, sampleCategory);
    }

    @Test
    void testGetAllTodos() {
        when(toDoRepository.findByIsArchivedFalse()).thenReturn(Arrays.asList(sampleToDo));

        List<ToDoDTO> todos = toDoService.getAllTodos();

        assertFalse(todos.isEmpty());
        assertEquals(1, todos.size());
        assertEquals("Test task", todos.get(0).getTaskName());
    }

    @Test
    void testCreateTodo() {
        when(categoryRepository.findById(1L)).thenReturn(Optional.of(sampleCategory));
        when(toDoRepository.save(any(ToDo.class))).thenReturn(sampleToDo);

        ToDoDTO createdTodo = toDoService.createTodo("New task", 1L);

        assertNotNull(createdTodo);
        assertEquals("New task", createdTodo.getTaskName());
        assertEquals("Work", createdTodo.getCategory().getName());
    }

    @Test
    void testCreateTodo_InvalidCategory() {
        when(categoryRepository.findById(2L)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            toDoService.createTodo("New task", 2L);
        });

        assertEquals("Category not found.", exception.getMessage());
    }

    @Test
    void testUpdateTodo() {
        when(categoryRepository.findById(1L)).thenReturn(Optional.of(sampleCategory));
        when(toDoRepository.findById(1L)).thenReturn(Optional.of(sampleToDo));
        when(toDoRepository.save(any(ToDo.class))).thenReturn(sampleToDo);

        ToDoDTO updatedTodo = toDoService.updateTodo(1L, "Updated task", 1L, true);

        assertNotNull(updatedTodo);
        assertEquals("Updated task", updatedTodo.getTaskName());
        assertTrue(updatedTodo.isCompleted());
    }

    @Test
    void testUpdateTodo_NotFound() {
        when(toDoRepository.findById(99L)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            toDoService.updateTodo(99L, "Task", 1L, true);
        });

        assertEquals("ToDo not found.", exception.getMessage());
    }

    @Test
    void testUpdateTodo_InvalidCategory() {
        when(toDoRepository.findById(1L)).thenReturn(Optional.of(sampleToDo));
        when(categoryRepository.findById(99L)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            toDoService.updateTodo(1L, "Task", 99L, true);
        });

        assertEquals("Category not found", exception.getMessage());
    }

    @Test
    void testArchiveTodo() {
        when(toDoRepository.findById(1L)).thenReturn(Optional.of(sampleToDo));

        toDoService.archiveTodo(1L);

        assertTrue(sampleToDo.isArchived(), "Todo should be marked as archived");

        verify(toDoRepository, times(1)).save(sampleToDo);
    }

    @Test
    void testArchiveTodo_NotFound() {
        when(toDoRepository.findById(99L)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            toDoService.archiveTodo(99L);
        });

        assertEquals("Todo not found", exception.getMessage());
    }
}
