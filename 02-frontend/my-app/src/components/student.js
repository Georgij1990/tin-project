import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Student() {
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/withRelatedRecords');
        if (!response.ok) {
          throw new Error("Error while fetching students data.");
        }
        const data = await response.json();
      } catch (err) {
         console.log(err); 
      }
    }
  }, []);

  return (
    <div>
      <div className="container-fluid">
        <h6 className="d-inline">Name:</h6>
        <p id="first-name">John Doe</p>
        <h6>Date of Birth:</h6>
        <p id="birth-date">11 Mar 1990</p>
        <h6>Email:</h6>
        <p id="email">john.doe#gmail.com</p>
      </div>
      <div>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Course Name</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Java</td>
              <td>21 Apr</td>
              <td>21 May</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}

export default Student;