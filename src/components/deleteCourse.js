import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

function DeleteCourse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    if (deleted) return;

    const deleteCourse = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/courses/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setDeleted(true);
          navigate("/courses");
        } 
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while deleting the course.");
      }
    };

    deleteCourse();
  }, []);
}

export default DeleteCourse;
