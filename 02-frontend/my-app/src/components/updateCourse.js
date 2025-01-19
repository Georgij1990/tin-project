import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import validateCoursetData from "../utils/validateCourseData";

function UpdateCourse() {
  const { id } = useParams(); 
  const [course, setCourse] = useState({
    courseName: '',
    startDate: '',
    endDate: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/courses/${id}`);
        if (!response.ok) {
          throw new Error("Course not found");
        }
        const data = await response.json();
        setCourse(data);
      } catch (err) {
        setError(err.message);
      }
    };
    
    fetchCourse();
  }, [id]);

  const validateData = async (event) => {
    event.preventDefault();
  
    const { courseName, startDate, endDate } = course;

    let isValid = validateCoursetData(courseName, startDate, endDate);

    if (!isValid) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/courses/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(course),
      });

      if (response.ok) {
        alert("Course updated successfully!");
        navigate('/courses'); 
      } else {
        alert("Failed to update course.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while updating the course.");
    }
  };

  if (error) return <p>{error}</p>;

  return (
    <div class="container">
      <form onSubmit={validateData} method="POST">
        <div class="form-item">
          <label for="courseName">Enter course name: </label>
          <input 
            type="text" 
            name="courseName" 
            id="courseName" 
            value={course.courseName}
            onChange={(e) => setCourse({...course, courseName: e.target.value})}
          />
          <span class="error-message" id="courseName-error"></span>
        </div>
        <div class="form-item">
          <label for="startDate">Enter start date of the course: </label>
          <input 
            type="text" 
            name="startDate" 
            id="startDate" 
            placeholder="yyyy-MM-dd" 
            value={course.startDate}
            onChange={(e) => setCourse({...course, startDate: e.target.value})}
          />
          <span class="error-message" id="startDate-error"></span>
        </div>
        <div class="form-item">
          <label for="endDate">Enter end date of the course: </label>
          <input 
            type="text" 
            name="endDate" 
            id="endDate" 
            placeholder="yyyy-MM-dd" 
            value={course.endDate}
            onChange={(e) => setCourse({...course, endDate: e.target.value})}
          />
          <span class="error-message" id="endDate-error"></span>
        </div>
        <div>
          <button type="submit" class="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default UpdateCourse;