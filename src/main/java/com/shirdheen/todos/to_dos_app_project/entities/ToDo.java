package com.shirdheen.todos.to_dos_app_project.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "todos")
public class ToDo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String taskName;

    @Column(nullable = false)
    private boolean isCompleted = false;

    @Column(nullable = false)
    private boolean isArchived = false;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    public ToDo(String taskName, Category category) {
        this.taskName = taskName;
        this.category = category;
        this.isCompleted = false;
        this.isArchived = false;
    }

}
