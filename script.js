const form = document.querySelector("#survey-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (
    validateAndHighlightLabels() &&
    validatePasswordFields() &&
    validateEmailField()
  ) {
    showConfirmationToast("Registration completed!");
  } else if (
    document.getElementById("myToast").style.display !== "block" &&
    document.getElementById("passwordMismatchToast").style.display !==
      "block" &&
    document.getElementById("emailToast").style.display !== "block"
  ) {
    showToast("Please fill in the required fields");
  }
});

function validateAndHighlightLabels() {
  const firstName = document.getElementById("first-name");
  const lastName = document.getElementById("last-name");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const passwordConfirmation = document.getElementById("confirm-password");

  validateAndHighlightLabel(
    firstName,
    lastName.value === "" || firstName.value === "",
    true
  );
  validateAndHighlightLabel(lastName, false, false);
  validateAndHighlightLabel(email, !isEmailValid(email.value), true);
  validateAndHighlightLabel(password, password.value.length < 8, true);
  validateAndHighlightLabel(
    passwordConfirmation,
    passwordConfirmation.value.length < 8 ||
      passwordConfirmation.value !== password.value,
    true
  );

  return !document.querySelector(".validation-failed:not(#last-name)");
}

function validatePasswordFields() {
  const password = document.getElementById("password");
  const passwordConfirmation = document.getElementById("confirm-password");

  const passwordValidationResult = validatePassword(
    password.value,
    passwordConfirmation.value
  );

  if (!passwordValidationResult.valid) {
    validateAndHighlightLabel(password, false, true);
    validateAndHighlightLabel(passwordConfirmation, true, true);
    showPasswordMismatchToast("Passwords do not match");
    return false;
  }

  return true;
}

function validatePassword(password, confirmPassword) {
  return { valid: password === confirmPassword };
}

function validateEmailField() {
  const email = document.getElementById("email");

  if (!isEmailValid(email.value)) {
    validateAndHighlightLabel(email, true, true);
    showEmailToast("Invalid email address");
    return false;
  }

  return true;
}

function validateAndHighlightLabel(
  inputElement,
  showAsterisk,
  showLastNameAsterisk
) {
  const labelElement = document.querySelector(`[for="${inputElement.id}"]`);

  if (inputElement.value === "" && inputElement.id !== "last-name") {
    inputElement.classList.add("validation-failed");
    labelElement.classList.add("validation-failed-label");
    if (
      showAsterisk &&
      (inputElement.id !== "last-name" || showLastNameAsterisk)
    ) {
      labelElement.classList.remove("no-asterisk");
    } else {
      labelElement.classList.add("no-asterisk");
    }
  } else {
    inputElement.classList.remove("validation-failed");
    labelElement.classList.remove("validation-failed-label");
    labelElement.classList.add("no-asterisk");
  }
}

function isEmailValid(email) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

function showToast(message) {
  const toast = document.getElementById("myToast");
  const toastMessage = document.getElementById("toastMessage");

  toastMessage.textContent = message;
  toast.style.display = "block";

  setTimeout(() => {
    toast.style.display = "none";
  }, 5000);
}

function showPasswordMismatchToast(message) {
  const passwordMismatchToast = document.getElementById(
    "passwordMismatchToast"
  );
  const passwordMismatchMessage = document.getElementById(
    "passwordMismatchToastMessage"
  );

  passwordMismatchMessage.textContent = message;
  passwordMismatchToast.style.display = "block";

  setTimeout(() => {
    passwordMismatchToast.style.display = "none";
  }, 5000);
}

function showEmailToast(message) {
  const emailToast = document.getElementById("emailToast");
  const emailToastMessage = document.getElementById("emailToastMessage");

  emailToastMessage.textContent = message;
  emailToast.style.display = "block";

  setTimeout(() => {
    emailToast.style.display = "none";
  }, 5000);
}

function showConfirmationToast(message) {
  const confirmationToast = document.getElementById("confirmationToast");
  const confirmationToastMessage = document.getElementById(
    "confirmationToastMessage"
  );

  confirmationToastMessage.textContent = message;
  confirmationToast.style.display = "block";

  setTimeout(() => {
    confirmationToast.style.display = "none";
  }, 5000);
}

const formInputs = form.querySelectorAll("input");
formInputs.forEach((input) => {
  input.addEventListener("input", () => {
    validateAndHighlightLabel(input, true, true);
  });
});
