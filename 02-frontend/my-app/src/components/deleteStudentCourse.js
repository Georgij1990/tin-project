import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

function DeleteStudentCourse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    if (deleted) return;

    const deleteCourse = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/studentCourses/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setDeleted(true);
          navigate("/studentAndCourses");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while assigning the student to the course.");
      }
    };

    deleteCourse();
  }, []);
}

export default DeleteStudentCourse;
