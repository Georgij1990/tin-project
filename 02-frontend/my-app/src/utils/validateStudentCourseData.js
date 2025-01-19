function validateStudentCoursetData(selectedStudent, selectedCourse, enrollmentDate, grade) {
  let isValid = true;

  if (!selectedStudent) {
    document.getElementById("student-error").innerText = "Choose student.";
    isValid = false;
  } else {
    document.getElementById("student-error").innerText = "";
  }

  if (!selectedStudent) {
    document.getElementById("course-error").innerText = "Choose course.";
    isValid = false;
  } else {
    document.getElementById("course-error").innerText = "";
  }

  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  if (!enrollmentDate.match(datePattern)) {
    document.getElementById("enrollment-data-error").innerText = "Enrollment date must be in the format yyyy-MM-dd.";
    isValid = false;
  } else {
    document.getElementById("enrollment-data-error").innerText = "";
  }

  if (!grade || grade < 0 || grade > 100) {
    document.getElementById("grade-error").innerText = "Enter grade from 0 to 100";
    isValid = false;
  } else {
    document.getElementById("grade-error").innerText = "";
  }

  return isValid;
}

export default validateStudentCoursetData;