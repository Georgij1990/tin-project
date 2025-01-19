import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import validateInputData from "../utils/validateInputData";

function UpdateStudent() {
  const { id } = useParams(); 
  const [student, setStudent] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    email: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/students/${id}`);
        if (!response.ok) {
          throw new Error("Student not found");
        }
        const data = await response.json();
        setStudent(data);
      } catch (err) {
        setError(err.message);
      }
    };
    
    fetchStudent();
  }, [id]);

  const validateData = async (event) => {
    event.preventDefault();
  
    const { firstName, lastName, birthDate, email } = student;

    let isValid = validateInputData(firstName, lastName, birthDate, email);

    if (!isValid) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/students/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(student),
      });

      if (response.ok) {
        alert("Student updated successfully!");
        navigate('/students'); 
      } else {
        alert("Failed to update student.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while updating the student.");
    }
  };

  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <form onSubmit={validateData}>
        <div className="form-item">
          <label htmlFor="name">Enter your name: </label>
          <input 
            type="text" 
            name="name" 
            id="name" 
            value={student.firstName} 
            onChange={(e) => setStudent({ ...student, firstName: e.target.value })} 
          />
          <span className="error-message" id="name-error"></span>
        </div>
        <div className="form-item">
          <label htmlFor="lastName">Enter your last name: </label>
          <input 
            type="text" 
            name="lastName" 
            id="lastName" 
            value={student.lastName} 
            onChange={(e) => setStudent({ ...student, lastName: e.target.value })} 
          />
          <span className="error-message" id="lastName-error"></span>
        </div>
        <div className="form-item">
          <label htmlFor="birthDate">Enter your birth date: </label>
          <input 
            type="text" 
            name="birthDate" 
            id="birthDate" 
            placeholder="yyyy-MM-dd" 
            value={student.birthDate} 
            onChange={(e) => setStudent({ ...student, birthDate: e.target.value })} 
          />
          <span className="error-message" id="birthDate-error"></span>
        </div>
        <div className="form-item">
          <label htmlFor="email">Enter your email: </label>
          <input 
            type="text" 
            name="email" 
            id="email" 
            value={student.email} 
            onChange={(e) => setStudent({ ...student, email: e.target.value })} 
          />
          <span className="error-message" id="email-error"></span>
        </div>
        <div>
          <button type="submit" className="submit">Update</button>
        </div>
      </form>
    </div>
  );
}

export default UpdateStudent;
