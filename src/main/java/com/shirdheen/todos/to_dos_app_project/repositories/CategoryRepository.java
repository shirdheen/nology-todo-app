package com.shirdheen.todos.to_dos_app_project.repositories;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.shirdheen.todos.to_dos_app_project.entities.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long>{
    List<Category> findAllByOrderByIdAsc();
    boolean existsByName(String name);
    boolean existsById(Long id);
}
