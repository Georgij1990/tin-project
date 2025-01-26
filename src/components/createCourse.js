import '../styles/form-style.css';
import validateCoursetData from '../utils/validateCourseData';
import validateInputData from '../utils/validateInputData';
import { useNavigate } from 'react-router-dom';

function CreateCourse() {
  const navigate = useNavigate(); 
  const validateData = async (event) => {
    event.preventDefault();
    
    const courseName = document.getElementById('courseName').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    let isValid = validateCoursetData(courseName, startDate, endDate);

    if (!isValid) {
      return;
    }

    const courseData = {
      courseName,
      startDate,
      endDate
    };
    
    try {
      const response = await fetch("http://localhost:8080/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
      });

      if (response.ok) {
        alert("Course created successfully!");
        navigate('/courses');
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while creating the course.");
    }
  };

  const handleCancel = () => {
    navigate('/studentAndCourses');
  };
  
  return (
    <div class="container">
      <form onSubmit={validateData} method="POST">
        <div class="form-item">
          <label for="courseName">Enter course name: </label>
          <input type="text" name="courseName" id="courseName" />
          <span class="error-message" id="courseName-error"></span>
        </div>
        <div class="form-item">
          <label for="startDate">Enter start date of the course: </label>
          <input type="text" name="startDate" id="startDate" placeholder="yyyy-MM-dd" />
          <span class="error-message" id="startDate-error"></span>
        </div>
        <div class="form-item">
          <label for="endDate">Enter end date of the course: </label>
          <input type="text" name="endDate" id="endDate" placeholder="yyyy-MM-dd" />
          <span class="error-message" id="endDate-error"></span>
        </div>
        <div className="button-group">
          <button type="submit" className="submit">Submit</button>
          <button type="button" className="cancel" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default CreateCourse;