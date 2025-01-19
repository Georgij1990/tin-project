package com.tin.tin_project.dao;

import com.tin.tin_project.dto.StudentDTO;
import com.tin.tin_project.entity.Student;

import java.util.List;

public interface IStudentRepository {
    List<Student> getStudents();
    List<StudentDTO> fetchStudents();
    Student findStudentById(int id);
    void createStudent(Student student);
    void deleteStudent(int studentId);
    void updateStudent(Student student);
}
