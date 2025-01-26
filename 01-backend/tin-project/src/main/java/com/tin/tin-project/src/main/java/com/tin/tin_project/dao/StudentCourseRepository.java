package com.tin.tin_project.dao;

import com.tin.tin_project.dto.StudentCourseDTO;
import com.tin.tin_project.entity.StudentCourse;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public class StudentCourseRepository implements IStudentCourseRepository {

    private EntityManager em;

    public StudentCourseRepository(EntityManager em) {
        this.em = em;
    }

    @Override
    public List<StudentCourseDTO> getStudentCourses() {
        String jpql = "SELECT new com.tin.tin_project.dto.StudentCourseDTO(" +
                "sc.id, s.id, s.firstName, s.lastName, s.email, s.birthDate, c.id, c.courseName, c.startDate, c.endDate, " +
                "sc.enrollmentDate, sc.grade) " +
                "FROM StudentCourse sc " +
                "JOIN sc.student s " +
                "JOIN sc.course c";

        TypedQuery<StudentCourseDTO> query = em.createQuery(jpql, StudentCourseDTO.class);
        return query.getResultList();
    }

    @Override
    public StudentCourseDTO getStudentCoursesById(int studentId) {
        String str = "SELECT new com.tin.tin_project.dto.StudentCourseDTO(" +
                "sc.id, s.id, s.firstName, s.lastName, s.email, s.birthDate, c.id, c.courseName, c.startDate, c.endDate, " +
                "sc.enrollmentDate, sc.grade) " +
                "FROM StudentCourse sc " +
                "JOIN sc.student s " +
                "JOIN sc.course c WHERE sc.id = :studentId";

        return em.createQuery(str, StudentCourseDTO.class)
                .setParameter("studentId", studentId)
                .getSingleResult();
    }

    @Override
    public StudentCourse findStudentCourse(int id) {
        return this.em.find(StudentCourse.class, id);
    }

    @Override
    @Transactional
    public void createStudentCourse(StudentCourse course) {
        this.em.persist(course);
    }

    @Override
    @Transactional
    public void deleteStudentCourse(int studentCourseId) {
        String jpql = "DELETE FROM StudentCourse s WHERE s.id = :studentCourseId";
        this.em.createQuery(jpql)
                .setParameter("studentCourseId", studentCourseId)
                .executeUpdate();
    }

    @Override
    @Transactional
    public void updateStudentCourse(StudentCourse studentCourse) {
        this.em.merge(studentCourse);
    }
}
