import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import GetData from "../utils/getData";
import '../styles/form-style.css';
import validateStudentCoursetData from "../utils/validateStudentCourseData";

function UpdateStudentCourse() {
  const [studentCourseId, setStudentCourseId] = useState();
  const [student, setStudent] = useState({
    firstName: "",
    lastName: ""
  });
  const [studentId, setStudentId] = useState();
  const [course, setCourse] = useState("");
  const [courseId, setCourseId] = useState();
  const [enrollmentDate, setEnrollmentDate] = useState("");
  const [grade, setGrade] = useState("");
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentCourse = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/studentCourses/${id}`);
        if (response.ok) {
          const data = await response.json();
          setStudentCourseId(data.studentCourseId);
          setStudent({firstName: data.firstName, lastName: data.lastName});
          setStudentId(data.studentId);
          setCourse(data.courseName);
          setCourseId(data.courseId);
          setEnrollmentDate(data.enrollmentDate);
          setGrade(data.grade);
        } else {
          throw new Error("Failed to fetch student course details.");
        }
      } catch (error) {
        setError(error);
      }
    };

    fetchStudentCourse();
  }, []);

  const validateData = (event) => {
    event.preventDefault();
    const enrollmentDate = document.getElementById('enrollmentDate').value;
    const grade = document.getElementById('grade').value;

    let isValid = validateStudentCoursetData(studentId, courseId, enrollmentDate, grade);

    if (!isValid) {
      return;
    }
    handleSubmit();
  };

  const handleSubmit = async () => {
    const updatedStudentCourse = {
      studentCourseId,
      studentId,
      courseId,
      enrollmentDate,
      grade,
    };

    try {
      const response = await fetch(`http://localhost:8080/api/studentCourses/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedStudentCourse),
      });

      if (response.ok) {
        alert("Student course updated successfully!");
        navigate("/studentAndCourses");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while updating the student course.");
    }
  };

  if (error) return <p>{error.toString()}</p>;

  return (
    <div className="container">
      <form onSubmit={validateData} method="POST">
        <div className="form-item">
          <label htmlFor="student">Student: </label>
          <input
            type="text"
            id="student"
            value={`${student.firstName} ${student.lastName}`}
            readOnly
          />
          <span class="error-message" id="student-error"></span>
        </div>

        <div className="form-item">
          <label htmlFor="course">Course: </label>
          <input
            type="text"
            id="course"
            value={`${course}`}
            readOnly
          />
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
          <span className="error-message" id="enrollment-data-error"></span>
        </div>

        <div className="form-item">
          <label htmlFor="grade">Grade: </label>
          <input
            type="text"
            id="grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          />
          <span className="error-message" id="grade-error"></span>
        </div>

        <div>
          <button type="submit" className="submit">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateStudentCourse;
