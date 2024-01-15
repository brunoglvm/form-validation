const form = document.querySelector("#survey-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (validateAndHighlightLabels() && validatePasswordFields()) {
    form.submit();
  } else if (
    document.getElementById("myModal").style.display !== "block" &&
    document.getElementById("passwordMismatchModal").style.display !== "block"
  ) {
    showModal("Please correct the highlighted fields");
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
  validateAndHighlightLabel(email, true, true);
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
    validateAndHighlightLabel(
      password,
      passwordValidationResult.minLength,
      true
    );
    validateAndHighlightLabel(passwordConfirmation, true, true);
    showPasswordMismatchModal("Passwords do not match");
    return false;
  }

  return true;
}

function validatePassword(password, confirmPassword) {
  const minLength = password.length >= 8;
  const match = password === confirmPassword;

  return { valid: minLength && match, minLength };
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

const formInputs = form.querySelectorAll("input");
formInputs.forEach((input) => {
  input.addEventListener("input", () => {
    validateAndHighlightLabel(input, true, true);
  });
});

function showModal(message) {
  const modal = document.getElementById("myModal");
  const modalMessage = document.getElementById("modal-message");

  modalMessage.textContent = message;
  modal.style.display = "block";

  const span = document.getElementsByClassName("close")[0];

  span.onclick = function () {
    modal.style.display = "none";
  };

  setTimeout(function () {
    modal.style.display = "none";
  }, 5000);
}

function showPasswordMismatchModal(message) {
  const passwordMismatchModal = document.getElementById(
    "passwordMismatchModal"
  );
  const passwordMismatchMessage = document.getElementById(
    "passwordMismatchMessage"
  );

  passwordMismatchMessage.textContent = message;
  passwordMismatchModal.style.display = "block";

  const closePasswordMismatchModalBtn = document.getElementById(
    "closePasswordMismatchModal"
  );

  closePasswordMismatchModalBtn.onclick = function () {
    passwordMismatchModal.style.display = "none";
  };

  setTimeout(function () {
    passwordMismatchModal.style.display = "none";
  }, 5000);
}
