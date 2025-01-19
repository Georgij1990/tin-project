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
@Table(name = "courses")
@Data
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "course_id")
    @JsonProperty
    private Long id;

    @Column(name = "course_name")
    @JsonProperty
    @NotNull(message = "Course name is required.")
    @NotEmpty(message = "Course name is required.")
    @Size(min = 1, message = "Course name cannot be empty.")
    private String courseName;

    @Column(name = "start_date")
    @JsonProperty
    @NotNull(message = "Start date is required.")
    @Convert(converter = LocalDateConverter.class)
    private LocalDate startDate;

    @Column(name = "end_date")
    @JsonProperty
    @NotNull(message = "End date is required.")
    @Convert(converter = LocalDateConverter.class)
    private LocalDate endDate;

    @AssertTrue(message = "End date must be after start date.")
    private boolean isEndDateAfterStartDate() {
        return endDate != null && startDate != null && endDate.isAfter(startDate);
    }

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JsonManagedReference(value = "courses-student")
    private List<StudentCourse> studentCourses;

}

