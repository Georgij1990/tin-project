package com.tin.tin_project.dto;

import java.time.LocalDate;

public class StudentCourseDTO {
    private Long studentCourseId;
    private Long studentId;
    private String firstName;
    private String lastName;
    private String email;
    private LocalDate birthDate;
    private Long courseId;
    private String courseName;
    private LocalDate startDate;
    private LocalDate endDate;
    private LocalDate enrollmentDate;
    private Double grade;

    public StudentCourseDTO(
            Long studentCourseId,
            Long studentId,
            String firstName,
            String lastName,
            String email,
            LocalDate birthDate,
            Long courseId,
            String courseName,
            LocalDate startDate,
            LocalDate endDate,
            LocalDate enrollmentDate,
            Double grade
    ) {
        this.studentCourseId = studentCourseId;
        this.studentId = studentId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.birthDate = birthDate;
        this.courseId = courseId;
        this.courseName = courseName;
        this.startDate = startDate;
        this.endDate = endDate;
        this.enrollmentDate = enrollmentDate;
        this.grade = grade;
    }


    public Long getStudentCourseId() {
        return studentCourseId;
    }

    public void setStudentCourseId(Long studentCourseId) {
        this.studentCourseId = studentCourseId;
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public Long getCourseId() {
        return courseId;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public LocalDate getEnrollmentDate() {
        return enrollmentDate;
    }

    public void setEnrollmentDate(LocalDate enrollmentDate) {
        this.enrollmentDate = enrollmentDate;
    }

    public Double getGrade() {
        return grade;
    }

    public void setGrade(Double grade) {
        this.grade = grade;
    }
}