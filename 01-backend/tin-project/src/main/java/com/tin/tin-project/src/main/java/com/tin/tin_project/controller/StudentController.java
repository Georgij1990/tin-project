package com.tin.tin_project.controller;

import com.tin.tin_project.dao.StudentRepository;
import com.tin.tin_project.dto.StudentDTO;
import com.tin.tin_project.entity.Student;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "http://localhost:3000")
public class StudentController {

    private final StudentRepository studentRepository;

    public StudentController(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @GetMapping("/withRelatedRecords")
    public List<Student> getAllStudents() {
        return studentRepository.getStudents();
    }

    @GetMapping
    public List<StudentDTO> fetchStudents() {
        return studentRepository.fetchStudents();
    }

    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable int id) {
        return studentRepository.findStudentById(id);
    }

    @PostMapping
    public ResponseEntity<String> createStudent(@RequestBody Student student) {
        try {
            studentRepository.createStudent(student);
            return ResponseEntity.status(HttpStatus.CREATED).body("Student created successfully!");
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create student.");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateStudent(@PathVariable int id, @RequestBody Student student) {
        try {
            Student existingStudent = studentRepository.findStudentById(id);

            if (existingStudent == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student not found.");
            }

            existingStudent.setFirstName(student.getFirstName());
            existingStudent.setLastName(student.getLastName());
            existingStudent.setBirthDate(student.getBirthDate());
            existingStudent.setEmail(student.getEmail());

            studentRepository.updateStudent(existingStudent);

            return ResponseEntity.status(HttpStatus.OK).body("Student updated successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update student.");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteStudent(@PathVariable int id) {
        studentRepository.deleteStudent(id);
        return ResponseEntity.status(HttpStatus.OK).body("Student deleted successfully!");
    }
}
