import React, {useState, useEffect} from "react";
import GetData from "../utils/getData";
import { useNavigate } from 'react-router-dom';

function Courses() {
  const url = 'http://localhost:8080/api/courses';
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    GetData(url, setCourses, setError);
  }, []);

  if (error) return <p>{error.toString()}</p>

  const handleEdit = (id) => {
    navigate(`/update-course/${id}`); 
  };

  const handleDelete = (id) => {
    navigate(`/delete-course/${id}`); 
  };

  return (
    <div className="container-fluid mt-5">
      <h2 className="mb-4">Courses List</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Id</th>
              <th>Course Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td>{course.id}</td>
                <td>{course.courseName}</td>
                <td>{course.startDate}</td>
                <td>{course.endDate}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => handleEdit(course.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(course.id)}
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

export default Courses;