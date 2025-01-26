import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import GetData from "../utils/getData";
import '../styles/form-style.css';
import validateStudentCoursetData from "../utils/validateStudentCourseData";

function CreateStudentCourse() {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [enrollmentDate, setEnrollmentDate] = useState("");
  const [grade, setGrade] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    GetData("http://localhost:8080/api/students", setStudents, setError);
    GetData("http://localhost:8080/api/courses", setCourses, setError);
  }, []);

  const validateData = (event) => {
    event.preventDefault();
    const enrollmentDate = document.getElementById('enrollmentDate').value;
    const grade = document.getElementById('grade').value;

    let isValid = validateStudentCoursetData(selectedStudent, selectedCourse, enrollmentDate, grade);

    if (!isValid) {
      return;
    }
    handleSubmit();
  };

  const handleSubmit = async () => {
    const studentCourse = {
      studentId: selectedStudent,
      courseId: selectedCourse,
      enrollmentDate,
      grade,
    };

    try {
      const response = await fetch("http://localhost:8080/api/studentCourses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentCourse),
      });

      if (response.ok) {
        alert("Student assigned to course successfully!");
        navigate("/studentAndCourses");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while assigning the student to the course.");
    }
  };

  if (error) return <p>{error.toString()}</p>;

  const handleCancel = () => {
    navigate('/studentAndCourses');
  };

  return (
    <div className="container">
      <form onSubmit={validateData} method="POST">
        <div className="form-item">
          <label htmlFor="student">Select Student: </label>
          <select
            id="student"
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
          >
            <option value="">Select Student</option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.firstName} {student.lastName}
              </option>
            ))}
          </select>
          <span class="error-message" id="student-error"></span>
        </div>

        <div className="form-item">
          <label htmlFor="course">Select Course: </label>
          <select
            id="course"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="">Select Course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.courseName}
              </option>
            ))}
          </select>
          <span class="error-message" id="course-error"></span>
        </div>

        <div className="form-item">
          <label htmlFor="enrollmentDate">Enrollment Date: </label>
          <input
            type="text"
            id="enrollmentDate"
            placeholder="yyyy-MM-dd"
            value={enrollmentDate}
            onChange={(e) => setEnrollmentDate(e.target.value)}
          />
          <span class="error-message" id="enrollment-data-error"></span>
        </div>

        <div className="form-item">
          <label htmlFor="grade">Grade: </label>
          <input
            type="text"
            id="grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          />
          <span class="error-message" id="grade-error"></span>
        </div>

        <div className="button-group">
          <button type="submit" className="submit">Assign</button>
          <button type="button" className="cancel" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}


export default CreateStudentCourse;