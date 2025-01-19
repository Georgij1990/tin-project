function validateInputData(firstName, lastName, birthDate, email) {
  let isValid = true;
  if (firstName.trim() === "") {
    document.getElementById("name-error").innerText = "Name is required.";
    isValid = false;
  } else {
    document.getElementById("name-error").innerText = "";
  }

  if (lastName === "") {
    document.getElementById("lastName-error").innerText = "Last name is required.";
    isValid = false;
  } else {
    document.getElementById("lastName-error").innerText = "";
  }

  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  if (!birthDate.match(datePattern)) {
    document.getElementById("birthDate-error").innerText = "Birth date must be in the format yyyy-MM-dd.";
    isValid = false;
  } else {
    document.getElementById("birthDate-error").innerText = "";
  }

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email.match(emailPattern)) {
    document.getElementById("email-error").innerText = "Invalid email format.";
    isValid = false;
  } else {
    document.getElementById("email-error").innerText = "";
  }

  return isValid;
}

export default validateInputData;