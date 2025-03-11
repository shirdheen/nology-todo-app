package com.shirdheen.todos.to_dos_app_project.Category;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.verify;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.shirdheen.todos.to_dos_app_project.dto.category.CategoryRequestDTO;
import com.shirdheen.todos.to_dos_app_project.dto.category.CategoryDTO;
import com.shirdheen.todos.to_dos_app_project.entities.Category;
import com.shirdheen.todos.to_dos_app_project.repositories.CategoryRepository;
import com.shirdheen.todos.to_dos_app_project.repositories.ToDoRepository;
import com.shirdheen.todos.to_dos_app_project.services.CategoryService;

public class CategoryServiceTest {

    @Mock
    private CategoryRepository categoryRepository;

    @Mock
    private ToDoRepository todoRepository;

    @InjectMocks
    private CategoryService categoryService;

    private Category sampleCategory;
    private CategoryRequestDTO sampleRequestDTO;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        sampleCategory = new Category();
        sampleCategory.setId(1L);
        sampleCategory.setName("Work");

        sampleRequestDTO = new CategoryRequestDTO();
        sampleRequestDTO.setName("Personal");
    }

    @Test
    void testGetAllCategories() {
        when(categoryRepository.findAllByOrderByIdAsc()).thenReturn(Arrays.asList(sampleCategory));

        List<CategoryDTO> categories = categoryService.getAllCategories();

        assertFalse(categories.isEmpty());
        assertEquals(1, categories.size());
        assertEquals("Work", categories.get(0).getName());
        verify(categoryRepository, times(1)).findAllByOrderByIdAsc();
    }

    @Test
    void testCreateCategory() {
        when(categoryRepository.save(any(Category.class))).thenAnswer(invocation -> {
            Category cat = invocation.getArgument(0);
            cat.setId(2L);
            return cat;
        });

        CategoryDTO createdCategory = categoryService.createCategory(sampleRequestDTO);

        assertNotNull(createdCategory);
        assertEquals("Personal", createdCategory.getName());
        verify(categoryRepository, times(1)).save(any(Category.class));
    }

    @Test
    void testUpdatedCategory_Found() {
        when(categoryRepository.findById(1L)).thenReturn(Optional.of(sampleCategory));
        when(categoryRepository.save(any(Category.class))).thenReturn(sampleCategory);

        CategoryDTO updatedCategory = categoryService.updateCategory(1L, sampleRequestDTO);

        assertNotNull(updatedCategory);
        assertEquals("Personal", updatedCategory.getName());
        verify(categoryRepository, times(1)).findById(1L);
        verify(categoryRepository, times(1)).save(sampleCategory);
    }

    @Test
    void testUpdatedCategory_NotFound() {
        when(categoryRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> categoryService.updateCategory(99L, sampleRequestDTO));
        verify(categoryRepository, times(1)).findById(99L);
        verify(categoryRepository, never()).save(any(Category.class));
    }

    @Test
    void testDeleteCategory_Found() {
        when(categoryRepository.findById(1L)).thenReturn(Optional.of(sampleCategory));
        doNothing().when(categoryRepository).delete(sampleCategory);

        categoryService.deleteCategory(1L);

        verify(categoryRepository, times(1)).findById(1L);
        verify(categoryRepository, times(1)).delete(sampleCategory);
    }

    @Test
    void testDeleteCategory_NotFound() {
        when(categoryRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> categoryService.deleteCategory(99L));
        verify(categoryRepository, times(1)).findById(99L);
        verify(categoryRepository, never()).delete(any(Category.class));
    }

}
