import { popupElements } from "../index.js";

// Добавление класса и сообщения с ошибкой на инпут формы
const showInputError = (formElement, inputElement, errorMessage, popupElements) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}_error`);
  const formButton = formElement.querySelector(popupElements.submitButtonSelector);
  inputElement.classList.add(popupElements.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(popupElements.errorClass);
  disabledButton(formButton, true, popupElements);
};

// Функция, которая удаляет класс с ошибкой на инпут формы
export const hideInputError = (formElement, inputElement, popupElements) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}_error`);
  const formButton = formElement.querySelector(popupElements.submitButtonSelector);
  if(errorElement) {
    inputElement.classList.remove(popupElements.inputErrorClass);
    errorElement.classList.remove(popupElements.errorClass);
    disabledButton(formButton, false, popupElements);
    errorElement.textContent = '';
  }
};

//Функция очищения полей после валидации
export const clearValidation = (formElement) => {

    if(formElement) {
        const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
        inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement, popupElements);
        });

        if(formElement.name === "new-place") {
            formElement.reset();
            disabledButton(formElement.querySelector(popupElements.submitButtonSelector), true, popupElements);
        };
    }
};

// Функция, которая проверяет валидность инпута формы
 export const checkInputValidity = (formElement, inputElement, popupElements) => {
    if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, popupElements);
  } 
  if (inputElement.validity.patternMismatch) {
   console.log(inputElement.dataset.errorMessage);
   showInputError(formElement, inputElement, inputElement.dataset.errorMessage, popupElements);
  } else {
    hideInputError(formElement, inputElement, popupElements);
  }
};

//Собираем все инпуты и вешаем слушатель
const setEventListeners = (formElement, popupElements) => {
  const inputList = Array.from(formElement.querySelectorAll(popupElements.inputSelector));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, popupElements);
    });
  });
};

//Собираем все формы и вызываем функцию, которая повесит слушатели на формы
export const enableValidation = (popupElements) => {
  const formList = Array.from(document.querySelectorAll(popupElements.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, popupElements);
  });
};

//Дизейбл кнопки формы
const disabledButton = (button, marker, popupElements) => {
  if(marker) {
    button.classList.add(popupElements.inactiveButtonClass);
    button.setAttribute('disabled', 'true');
  } else {
    button.classList.remove(popupElements.inactiveButtonClass);
    button.removeAttribute('disabled');
  };
};