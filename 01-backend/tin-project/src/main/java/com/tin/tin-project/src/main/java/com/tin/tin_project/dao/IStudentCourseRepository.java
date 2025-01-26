package com.tin.tin_project.dao;

import com.tin.tin_project.dto.StudentCourseDTO;
import com.tin.tin_project.entity.StudentCourse;

import java.util.List;

public interface IStudentCourseRepository {
    List<StudentCourseDTO> getStudentCourses();
    StudentCourseDTO getStudentCoursesById(int studentId);
    StudentCourse findStudentCourse(int id);
    void createStudentCourse(StudentCourse course);
    void deleteStudentCourse(int studentCourseId);
    void updateStudentCourse(StudentCourse studentCourse);
}
