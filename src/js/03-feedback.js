import throttle from 'lodash.throttle';
const formRef = document.querySelector('.feedback-form');
const textAreaRef = document.querySelector('.feedback-form textarea');
const emailInputRef = document.querySelector('.feedback-form input');
const STORAGE_KEY = 'feedback-form-state';
const formData = {};

formRef.addEventListener('submit', onFormSubmit);
formRef.addEventListener('input', throttle(onFormInput, 500));

populateTextArea();

function onFormSubmit(e) {
  e.preventDefault();
  e.currentTarget.reset();
  console.log(formData);
  localStorage.removeItem(STORAGE_KEY);
}

function populateTextArea() {
  const parsedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY)).message;
  const parsedEmail = JSON.parse(localStorage.getItem(STORAGE_KEY)).email;

  if (parsedMessage) {
    textAreaRef.value = parsedMessage;
    formData.message = parsedMessage;
  }
  if (parsedEmail) {
    emailInputRef.value = parsedEmail;
    formData.email = parsedEmail;
  }
}

function onFormInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}
