package com.tin.tin_project.dao;

import com.tin.tin_project.dto.CourseDTO;
import com.tin.tin_project.entity.Course;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public class CourseRepository implements ICourseRepository {

    private EntityManager em;

    public CourseRepository(EntityManager em) {
        this.em = em;
    }

    @Override
    public List<Course> getCourses() {
        String str = "SELECT c FROM Course c " +
                "LEFT JOIN FETCH c.studentCourses sc";

        TypedQuery<Course> query = em.createQuery(str, Course.class);
        return query.getResultList();
    }

    @Override
    public List<CourseDTO> fetchCourses() {
        String str = "SELECT new com.tin.tin_project.dto.CourseDTO(c.id, c.courseName, c.startDate, c.endDate) FROM Course c";
        TypedQuery<CourseDTO> query = em.createQuery(str, CourseDTO.class);
        return query.getResultList();
    }

    @Override
    public Course findCourseById(int id) {
        return this.em.find(Course.class, id);
    }

    @Override
    @Transactional
    public void createCourse(Course course) {
        this.em.persist(course);
    }

    @Override
    @Transactional
    public void deleteCourse(int courseId) {
        String deleteStudentCoursesJpql = "DELETE FROM StudentCourse sc WHERE sc.course.id = :courseId";
        em.createQuery(deleteStudentCoursesJpql)
                .setParameter("courseId", courseId)
                .executeUpdate();

        String jpql = "DELETE FROM Course c WHERE c.id = :courseId";
        this.em.createQuery(jpql)
                .setParameter("courseId", courseId)
                .executeUpdate();
    }

    @Override
    @Transactional
    public void updateCourse(Course course) {
        this.em.merge(course);
    }
}
