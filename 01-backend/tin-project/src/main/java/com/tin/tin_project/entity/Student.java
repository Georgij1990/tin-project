package com.tin.tin_project.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.tin.tin_project.converter.LocalDateConverter;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name="students")
@Data
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "student_id")
    @JsonProperty
    private Long id;

    @Column(name = "first_name")
    @JsonProperty
    @NotNull(message = "First name is required.")
    @NotEmpty(message = "First name is required.")
    @Size(min = 1, message = "First name is required.")
    private String firstName;

    @Column(name = "last_name")
    @JsonProperty
    @NotNull(message = "Last name is required.")
    @NotEmpty(message = "Last name is required.")
    @Size(min = 1, message = "Last name is required.")
    private String lastName;

    @Column(name = "birth_date")
    @JsonProperty
    @NotNull(message = "Birth date is required.")
    @Convert(converter = LocalDateConverter.class)
    private LocalDate birthDate;

    @Column(name = "email")
    @JsonProperty
    @NotNull(message = "Email is required.")
    @NotEmpty(message = "Email is required.")
    @Email(message = "Invalid email format.")
    private String email;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JsonManagedReference(value="student-courses")
    private List<StudentCourse> studentCourses;
}
