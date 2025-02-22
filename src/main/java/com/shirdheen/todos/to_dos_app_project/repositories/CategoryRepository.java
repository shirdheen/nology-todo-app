package com.shirdheen.todos.to_dos_app_project.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.shirdheen.todos.to_dos_app_project.entities.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long>{

}
