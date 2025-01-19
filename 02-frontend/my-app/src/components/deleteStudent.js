import { useParams, useNavigate } from "react-router-dom";
import React, {useEffect, useState} from "react";

function DeleteStudent() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [deleted, setDeleted] = useState(false);

    useEffect(() => {
      if (deleted) return;
      const deleteStudent = async () => {
          try {
              const response = await fetch(`http://localhost:8080/api/students/${id}`, {
                  method: 'DELETE',
              });

              if (response.ok) {
                setDeleted(true);
                navigate('/students'); 
              }
          } catch (error) {
              console.error("Error:", error);
              alert("An error occurred while deleting the student.");
          }
      };

      deleteStudent();
  }, []);
}

export default DeleteStudent;