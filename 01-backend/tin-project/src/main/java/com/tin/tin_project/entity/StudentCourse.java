package com.tin.tin_project.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.tin.tin_project.converter.LocalDateConverter;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Table(name = "student_courses")
@Data
public class StudentCourse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @JsonProperty
    private long id;

    @ManyToOne
    @JoinColumn(name = "student_id", referencedColumnName = "student_id", nullable = false)
    @JsonBackReference(value="student-courses")
    private Student student;

    @ManyToOne
    @JoinColumn(name = "course_id", referencedColumnName = "course_id", nullable = false)
    @JsonBackReference(value="courses-student")
    private Course course;

    @Column(name = "enrollment_date", nullable = false)
    @JsonProperty
    @Convert(converter = LocalDateConverter.class)
    private LocalDate enrollmentDate;

    @Column(name = "grade")
    @JsonProperty
    private Double grade;
}
