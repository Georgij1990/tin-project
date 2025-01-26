import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GetData from "../utils/getData";

function Students() {
  const url = "http://localhost:8080/api/students";
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    GetData(url, setStudents, setError);
  }, []);

  if (error) return <p className="text-danger">{error.toString()}</p>;

  const handleEdit = (id) => {
    navigate(`/update-student/${id}`);
  };

  const handleDelete = (id) => {
    navigate(`/delete-student/${id}`);
  };

  return (
    <div className="container-fluid">
      <h2 className="mb-4">Students List</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Birth Date</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.birthDate}</td>
                <td>{student.email}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => handleEdit(student.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(student.id)}
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

export default Students;
