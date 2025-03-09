package com.shirdheen.todos.to_dos_app_project.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.shirdheen.todos.to_dos_app_project.entities.ToDo;

@Repository
public interface ToDoRepository extends JpaRepository<ToDo, Long> {

    List<ToDo> findByIsArchivedFalse(); // Fetching all non-archived tasks

    List<ToDo> findByIsArchivedTrue();

    List<ToDo> findByCategoryIdAndIsArchivedFalse(Long categoryId); // Fetch todos by category ID

    List<ToDo> findByCategoryIdAndIsArchivedTrue(Long categoryId);

    boolean existsByCategoryId(Long categoryId);

}
