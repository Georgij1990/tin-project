package com.tin.tin_project.controller;

import com.tin.tin_project.dao.CourseRepository;
import com.tin.tin_project.dao.StudentRepository;
import com.tin.tin_project.dto.StudentCourseDTO;
import com.tin.tin_project.dao.StudentCourseRepository;
import com.tin.tin_project.entity.Course;
import com.tin.tin_project.entity.Student;
import com.tin.tin_project.entity.StudentCourse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/studentCourses")
@CrossOrigin(origins = "http://localhost:3000")
public class StudentCourseController {
    private final StudentCourseRepository studentCourseRepository;
    private final CourseRepository courseRepository;
    private final StudentRepository studentRepository;

    public StudentCourseController(StudentCourseRepository studentCourseRepository, CourseRepository courseRepository, StudentRepository studentRepository) {
        this.studentCourseRepository = studentCourseRepository;
        this.courseRepository = courseRepository;
        this.studentRepository = studentRepository;
    }

    @GetMapping
    public List<StudentCourseDTO> getAllStudentCourses() {
        return studentCourseRepository.getStudentCourses();
    }

    @GetMapping("/{id}")
    public StudentCourseDTO getStudentCourseById(@PathVariable int id) {
        return studentCourseRepository.getStudentCoursesById(id);
    }

    @PostMapping
    public ResponseEntity<String> createStudentCourse(@RequestBody Map<String, Object> studentCourseData) {
        try {
            int studentId = Integer.parseInt(studentCourseData.get("studentId").toString());
            int courseId = Integer.parseInt(studentCourseData.get("courseId").toString());
            LocalDate enrollmentDate = LocalDate.parse(studentCourseData.get("enrollmentDate").toString());
            Double grade = Double.parseDouble(studentCourseData.get("grade").toString());
            Student student = studentRepository.findStudentById(studentId);
            if (student == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Student not found with ID: " + studentId);
            }
            Course course = courseRepository.findCourseById(courseId);
            if (course == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Course not found with ID: " + courseId);
            }
            StudentCourse studentCourse = new StudentCourse();
            studentCourse.setStudent(student);
            studentCourse.setCourse(course);
            studentCourse.setEnrollmentDate(enrollmentDate);
            studentCourse.setGrade(grade);
            studentCourseRepository.createStudentCourse(studentCourse);
            return ResponseEntity.ok("Student assigned to course successfully!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateStudentCourse(@PathVariable int id, @RequestBody Map<String, Object> studentCourseData) {
        try {
            int studentCourseId = Integer.parseInt(studentCourseData.get("studentCourseId").toString());
            int studentId = Integer.parseInt(studentCourseData.get("studentId").toString());
            int courseId = Integer.parseInt(studentCourseData.get("courseId").toString());

            Student student = studentRepository.findStudentById(studentId);

            if (student == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Student not found with ID: " + studentId);
            }

            Course course = courseRepository.findCourseById(courseId);
            if (course == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Course not found with ID: " + courseId);
            }

            StudentCourse existingStudentCourse = studentCourseRepository.findStudentCourse(studentCourseId);


            if (existingStudentCourse == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student not found.");
            }
            LocalDate enrollmentDate = LocalDate.parse(studentCourseData.get("enrollmentDate").toString());
            Double grade = Double.parseDouble(studentCourseData.get("grade").toString());

            existingStudentCourse.setStudent(student);
            existingStudentCourse.setCourse(course);
            existingStudentCourse.setEnrollmentDate(enrollmentDate);
            existingStudentCourse.setGrade(grade);
            studentCourseRepository.updateStudentCourse(existingStudentCourse);
            return ResponseEntity.ok("Student assigned to course successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update student course.");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteStudentCourse(@PathVariable int id) {
        studentCourseRepository.deleteStudentCourse(id);
        return ResponseEntity.status(HttpStatus.OK).body("Student Course record deleted successfully!");
    }
}
