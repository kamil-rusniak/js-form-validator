const form = document.querySelector(".form");
const firstName = document.getElementById("firstname");
const lastName = document.getElementById("lastname");
const email = document.getElementById("email");
const username = document.getElementById("username");
const password = document.getElementById("password");
const passwordConfirm = document.getElementById("password-confirm");
const tab1 = document.querySelector(".tab1");
const tab2 = document.querySelector(".tab2");
const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");
const btnSubmit = document.querySelector(".btn-submit");
const step1 = document.querySelector(".step1");
const step2 = document.querySelector(".step2");

// formFieldContainer is parent of input and we add invalid class to it in CSS
function showInputError(input, errorMessage) {
  const formFieldContainer = input.parentElement;
  formFieldContainer.className = "form-field-container invalid";
  const small = formFieldContainer.querySelector("small");
  small.innerText = errorMessage;
}

function showInputSuccess(input) {
  const formFieldContainer = input.parentElement;
  formFieldContainer.className = "form-field-container valid";
}

// Checking if required fields are filled
function checkRequired(inputArray) {
  let state = "";
  inputArray.forEach(function (input) {
    // trim - removes white space
    if (input.value.trim() === "") {
      // displaying error for proper input and getting text from its' label tag (which is sibling of that input)
      showInputError(
        input,
        `${input.previousElementSibling.textContent} is required`
      );
      state = "invalid";
    } else {
      showInputSuccess(input);
      state = "valid";
    }
  });
  return state;
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showInputError(
      input,
      `${input.previousElementSibling.textContent} must contain at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showInputError(
      input,
      `${input.previousElementSibling.textContent} must contain less than ${max} characters`
    );
  } else {
    showInputSuccess(input);
  }
}

// Checking if email input is valid using regular expression
function checkEmail(input) {
  let state = "";
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showInputSuccess(input);
    state = "valid";
  } else {
    showInputError(input, "Email is not valid");
    state = "invalid";
  }
  return state;
}

function checkPasswords(pass1, pass2) {
  if (pass1.value !== pass2.value) {
    showInputError(pass2, "Passwords don't match");
  }
}

// go to previous tab
function prevTab() {
  tab1.style.display = "block";
  tab2.style.display = "none";
  btnNext.style.display = "block";
  btnPrev.style.display = "none";
  btnSubmit.style.display = "none";
  step1.classList.toggle("active");
  step2.classList.toggle("active");
}

function nextTab() {
  
  checkRequired([firstName, lastName, email]);
// go to next tab if required fields are filled and email is valid
  if (
    checkRequired([firstName]) == "valid" &&
    checkRequired([lastName]) &&
    checkRequired([email]) == "valid" &&
    checkEmail(email) == "valid"
  ) {
    tab1.style.display = "none";
    tab2.style.display = "block";
    btnNext.style.display = "none";
    btnPrev.style.display = "block";
    btnSubmit.style.display = "block";
    step1.classList.toggle("active");
    step2.classList.toggle("active");
  }
}

// Event listener that check second-step inputs on submit
form.addEventListener("submit", function (e) {
  e.preventDefault();
  
  checkRequired([username, password, passwordConfirm]);
  checkLength(username, 3, 20);
  checkLength(password, 8, 65);
  checkPasswords(password, passwordConfirm);
});
