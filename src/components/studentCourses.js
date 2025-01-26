import React, { useState, useEffect } from "react";
import GetData from "../utils/getData";
import { useNavigate } from 'react-router-dom';

function StudentAndCourses() {
  const url = 'http://localhost:8080/api/studentCourses';
  const [studentCourses, setStudentCourses] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    GetData(url, setStudentCourses, setError);
  }, []);

  if (error) return <p>{error.toString()}</p>;

  const handleEdit = (id) => {
    navigate(`/update-student-course/${id}`); 
  };

  const handleDelete = (id) => {
    navigate(`/delete-student-course/${id}`); 
  };

  return (
    <div className="container-fluid mt-5">
      <h2 className="mb-4">Student Course List</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Student Course ID</th>
              <th>Student Name</th>
              <th>Course Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Enrollment Date</th>
              <th>Grade</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {studentCourses.map((studentCourse) => (
              <tr key={studentCourse.studentCourseId}>
                <td>{studentCourse.studentCourseId}</td>
                <td>{`${studentCourse.firstName} ${studentCourse.lastName}`}</td>
                <td>{studentCourse.courseName}</td>
                <td>{studentCourse.startDate}</td>
                <td>{studentCourse.endDate}</td>
                <td>{studentCourse.enrollmentDate}</td>
                <td>{studentCourse.grade}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => handleEdit(studentCourse.studentCourseId)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(studentCourse.studentCourseId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentAndCourses;
