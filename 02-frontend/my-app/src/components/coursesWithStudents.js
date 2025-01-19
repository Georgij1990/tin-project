import React, { useState, useEffect } from "react";
import GetData from "../utils/getData";

function CoursesWithStudents() {
  const url = 'http://localhost:8080/api/courses/withRelatedRecords';
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    GetData(url, setCourses, setError);
  }, []);

  if (error) return <p>{error.toString()}</p>
  return (
    <div className="container-fluid mt-5">
      <h2 className="mb-4">Courses and Enrollments List</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Course ID</th>
              <th>Course Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Student Course ID</th>
              <th>Enrollment Date</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) =>
              course.studentCourses.map((studentCourse) => (
                <tr key={`${studentCourse.id}-${course.id}`}>
                  <td>{course.id}</td>
                  <td>{course.courseName}</td>
                  <td>{course.startDate}</td>
                  <td>{course.endDate}</td>
                  <td>{studentCourse.id}</td>
                  <td>{studentCourse.enrollmentDate}</td>
                  <td>{studentCourse.grade}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CoursesWithStudents;