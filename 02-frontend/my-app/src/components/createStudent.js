import '../styles/form-style.css';
import validateInputData from '../utils/validateInputData';
import { useNavigate } from 'react-router-dom';

function CreateStudent() {
  const navigate = useNavigate(); 
  const validateData = async (event) => {
    event.preventDefault();
    
    const firstName = document.getElementById('name').value;
    const lastName = document.getElementById('lastName').value;
    const birthDate = document.getElementById('birthDate').value;
    const email = document.getElementById('email').value;

    let isValid = validateInputData(firstName, lastName, birthDate, email);

    if (!isValid) {
      return;
    }

    const studentData = {
      firstName,
      lastName,
      birthDate,
      email,
    };
    
    try {
      const response = await fetch("http://localhost:8080/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData),
      });

      if (response.ok) {
        alert("Student created successfully!");
        navigate('/students');
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while creating the student.");
    }
  };

  const handleCancel = () => {
    navigate('/studentAndCourses');
  };

  return (
    <div class="container">
      <form onSubmit={validateData} method="POST">
        <div class="form-item">
          <label for="name">Enter your name: </label>
          <input type="text" name="name" id="name" />
          <span class="error-message" id="name-error"></span>
        </div>
        <div class="form-item">
          <label for="lastName">Enter your last name: </label>
          <input type="text" name="lastName" id="lastName" />
          <span class="error-message" id="lastName-error"></span>
        </div>
        <div class="form-item">
          <label for="birthDate">Enter your birth date: </label>
          <input type="text" name="birthDate" id="birthDate" placeholder="yyyy-MM-dd" />
          <span class="error-message" id="birthDate-error"></span>
        </div>
        <div class="form-item">
          <label for="text">Enter your email: </label>
          <input type="text" name="email" id="email" />
          <span class="error-message" id="email-error"></span>
        </div>
        <div className="button-group">
          <button type="submit" className="submit">Submit</button>
          <button type="button" className="cancel" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default CreateStudent;