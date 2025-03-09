package com.shirdheen.todos.to_dos_app_project.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.shirdheen.todos.to_dos_app_project.dto.DTOMapper;
import com.shirdheen.todos.to_dos_app_project.dto.category.CategoryDTO;
import com.shirdheen.todos.to_dos_app_project.dto.category.CategoryRequestDTO;
import com.shirdheen.todos.to_dos_app_project.entities.Category;
import com.shirdheen.todos.to_dos_app_project.repositories.CategoryRepository;
import com.shirdheen.todos.to_dos_app_project.repositories.ToDoRepository;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final ToDoRepository todoRepository;

    public CategoryService(CategoryRepository categoryRepository, ToDoRepository todoRepository) {
        this.categoryRepository = categoryRepository;
        this.todoRepository = todoRepository;
    }

    public List<CategoryDTO> getAllCategories() {
        return categoryRepository.findAllByOrderByIdAsc().stream().map(DTOMapper::toCategoryDTO).collect(Collectors.toList());
    }

    public CategoryDTO createCategory(CategoryRequestDTO request) {
        Category category = new Category();
        category.setName(request.getName());

        Category savedCategory = categoryRepository.save(category);
        return DTOMapper.toCategoryDTO(savedCategory);
    }

    public CategoryDTO updateCategory(Long id, CategoryRequestDTO request) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sorry, category not found"));

        category.setName(request.getName());
        Category updatedCategory = categoryRepository.save(category);

        return DTOMapper.toCategoryDTO(updatedCategory);
    }

    public void deleteCategory(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sorry, category not found"));
        
        boolean isCategoryInUse = todoRepository.existsByCategoryId(id);
        if (isCategoryInUse) {
            throw new DataIntegrityViolationException("Cannot delete cateory. It is assigned to existing Todos.");
        }

        categoryRepository.delete(category);
    }

}
