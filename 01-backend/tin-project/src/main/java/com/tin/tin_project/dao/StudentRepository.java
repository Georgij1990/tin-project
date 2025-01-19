package com.tin.tin_project.dao;

import com.tin.tin_project.dto.StudentDTO;
import com.tin.tin_project.entity.Student;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public class StudentRepository implements IStudentRepository {


    private EntityManager em;


    public StudentRepository(EntityManager em) {
        this.em = em;
    }

    @Override
    public List<Student> getStudents() {
        String str = "SELECT s FROM Student s LEFT JOIN FETCH s.studentCourses";

        TypedQuery<Student> query = em.createQuery(str, Student.class);

        return query.getResultList();
    }

    @Override
    public List<StudentDTO> fetchStudents() {
        String str = "SELECT new com.tin.tin_project.dto.StudentDTO(s.id, s.firstName, s.lastName, s.birthDate, s.email) FROM Student s";
        TypedQuery<StudentDTO> query = em.createQuery(str, StudentDTO.class);
        return query.getResultList();
    }

    @Override
    public Student findStudentById(int id) {
        return this.em.find(Student.class, id);
    }

    @Override
    @Transactional
    public void createStudent(Student student) {
        this.em.persist(student);
    }

    @Override
    @Transactional
    public void deleteStudent(int studentId) {
        String deleteStudentCoursesJpql = "DELETE FROM StudentCourse sc WHERE sc.student.id = :studentId";
        em.createQuery(deleteStudentCoursesJpql)
                .setParameter("studentId", studentId)
                .executeUpdate();

        String str = "DELETE FROM Student s WHERE s.id = :studentId";
        this.em.createQuery(str)
                .setParameter("studentId", studentId)
                .executeUpdate();
    }

    @Override
    @Transactional
    public void updateStudent(Student student) {
        this.em.merge(student);
    }
}
