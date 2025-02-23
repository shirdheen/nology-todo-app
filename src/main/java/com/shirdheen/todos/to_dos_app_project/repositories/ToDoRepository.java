package com.shirdheen.todos.to_dos_app_project.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.shirdheen.todos.to_dos_app_project.entities.ToDo;

@Repository
public interface ToDoRepository extends JpaRepository<ToDo, Long> {

    List<ToDo> findByArchivedFalse(); // Fetching all non-archived tasks

    List<ToDo> findByCategoryIdAndArchivedFalse(Long categoryId); // Fetch todos by category ID

}
