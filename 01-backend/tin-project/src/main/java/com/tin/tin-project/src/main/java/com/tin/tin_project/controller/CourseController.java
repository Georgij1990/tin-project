package com.tin.tin_project.controller;

import com.tin.tin_project.dao.CourseRepository;
import com.tin.tin_project.dto.CourseDTO;
import com.tin.tin_project.entity.Course;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "http://localhost:3000")
public class CourseController {

    private final CourseRepository courseRepository;

    public CourseController(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    @GetMapping("/withRelatedRecords")
    public List<Course> getAllCourses() {
        return courseRepository.getCourses();
    }

    @GetMapping
    public List<CourseDTO> fetchCourses() {
        return courseRepository.fetchCourses();
    }

    @GetMapping("/{id}")
    public Course getCourseById(@PathVariable int id) {
        return courseRepository.findCourseById(id);
    }

    @PostMapping
    public ResponseEntity<String> createCourse(@RequestBody Course course) {
        try {
            courseRepository.createCourse(course);
            return ResponseEntity.status(HttpStatus.CREATED).body("Course created successfully!");
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create course.");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateCourse(@PathVariable int id, @RequestBody Course course) {
        try {
            Course existingCourse = courseRepository.findCourseById(id);

            if (existingCourse == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Course not found.");
            }

            existingCourse.setCourseName(course.getCourseName());
            existingCourse.setStartDate(course.getStartDate());
            existingCourse.setEndDate(course.getEndDate());

            courseRepository.updateCourse(existingCourse);

            return ResponseEntity.status(HttpStatus.OK).body("Course updated successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update course.");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCourse(@PathVariable int id) {
        courseRepository.deleteCourse(id);
        return ResponseEntity.status(HttpStatus.OK).body("Course deleted successfully!");
    }
}
