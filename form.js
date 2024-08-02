const fields = document.querySelectorAll(".input-field");
const createButton = document.querySelector(".create-button");

fields.forEach((element) => {
  element.addEventListener("blur", (event) => {
    validateForm(event);
  });
});

function validateForm(event) {
  switch (event.target.id) {
    case "email":
      validateEmail(event.target);
      break;
    case "password":
      validatePassowrd(event.target);
      break;
    case "confirm":
      validateConfirm(event.target);
      break;
    default:
      alert("Validation error");
  }
}

function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (email.value === "") {
    setError(email, "Email is rquired");
  } else if (!regex.test(email.value)) {
    setError(email, "Email is incorrect");
  } else {
    setValid(email);
  }
}

function validatePassowrd(password) {
  const regex = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  if (password.value === "") {
    setError(password, "Password is reqiured");
  } else if (!regex.test(password.value)) {
    setError(password, "Password is incorrect. You must enter this password");
  } else {
    setValid(password);
  }
}

function validateConfirm(confirmField) {
  if (confirmField.value === "") {
    setError(confirmField, "Confirm password is required");
  } else if (confirmField.value != password.value) {
    setError(confirmField, "Password confrim does not match.Try again");
  } else {
    setValid(confirmField);
  }
}

function setValid(inputField, message) {
  let paragraph = document.querySelector(`.message-${inputField.id}`);
  paragraph.textContent = message;
  inputField.classList.remove("valid");
  inputField.classList.remove("invalid");
  inputField.classList.toggle("valid");
}

function setError(inputField, message) {
  let paragraph = document.querySelector(`.message-${inputField.id}`);
  paragraph.classList.remove("error");
  paragraph.classList.toggle("error");
  paragraph.textContent = message;
  inputField.classList.remove("invalid");
  inputField.classList.remove("valid");
  inputField.classList.toggle("invalid");
}

createButton.addEventListener("click", (e) => {
  saveAccount(e);
});

function saveAccount(e) {
  e.preventDefault();
  let email = document.getElementById("email");
  let password = document.getElementById("password");
  const confirm = document.getElementById("confirm");

  if (email.value == "" || password.value == "") {
    validateEmail(email);
    validatePassowrd(password);
    validateConfirm(confirm);
    alert("The fields is empty!");
  } else {
    let confirm = document.getElementById("confirm");
    alert("Success!! Now you have created an account");
    console.log(
      `This form has an email of ${email.value} and password of ${password.value}`
    );

    email.value = "";
    password.value = "";
    confirm.value = "";
    email.classList.remove("valid");
    password.classList.remove("valid");
    confirm.classList.remove("valid");
  }
}
