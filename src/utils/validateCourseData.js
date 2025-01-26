function validateCoursetData(courseName, startDate, endDate) {
  let isValid = true;
  if (courseName.trim() === "") {
    document.getElementById("courseName-error").innerText = "Course name is required.";
    isValid = false;
  } else {
    document.getElementById("courseName-error").innerText = "";
  }

  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  if (!startDate.match(datePattern)) {
    document.getElementById("startDate-error").innerText = "Start date must be in the format yyyy-MM-dd.";
    isValid = false;
  } else {
    document.getElementById("startDate-error").innerText = "";
  }

  if (!endDate.match(datePattern)) {
    document.getElementById("endDate-error").innerText = "End date must be in the format yyyy-MM-dd.";
    isValid = false;
  } else {
    document.getElementById("endDate-error").innerText = "";
  }

  if (startDate.match(datePattern) && endDate.match(datePattern)) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (end <= start) {
      document.getElementById("endDate-error").innerText = "End date must be after start date.";
      isValid = false;
    } else {
      document.getElementById("endDate-error").innerText = "";
    }
  }

  return isValid;
}

export default validateCoursetData;