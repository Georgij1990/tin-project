package com.tin.tin_project.dao;

import com.tin.tin_project.dto.CourseDTO;
import com.tin.tin_project.entity.Course;

import java.util.List;

public interface ICourseRepository {
    List<Course> getCourses();
    List<CourseDTO> fetchCourses();
    Course findCourseById(int id);
    void createCourse(Course course);
    void deleteCourse(int courseId);
    void updateCourse(Course course);
}
