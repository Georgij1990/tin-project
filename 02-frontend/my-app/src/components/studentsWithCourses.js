import React, { useState, useEffect } from "react";
import GetData from "../utils/getData";

function StudentsWithCourses() {
  const url = 'http://localhost:8080/api/students/withRelatedRecords';
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    GetData(url, setStudents, setError);
  }, []);

  if (error) return <p>{error.toString()}</p>
  
  return (
    <div className="container-fluid mt-5">
      <h2 className="mb-4">Students and Courses List</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Birth Date</th>
              <th>Email</th>
              <th>Course ID</th>
              <th>Enrollment Date</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) =>
              student.studentCourses.map((course) => (
                <tr key={`${student.id}-${course.id}`}>
                  <td>{student.id}</td>
                  <td>{student.firstName}</td>
                  <td>{student.lastName}</td>
                  <td>{student.birthDate}</td>
                  <td>{student.email}</td>
                  <td>{course.id}</td>
                  <td>{course.enrollmentDate}</td>
                  <td>{course.grade}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentsWithCourses;