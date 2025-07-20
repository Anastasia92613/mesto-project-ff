import { disabledButton } from "../components/modal.js";

//Классы элементов попапа для настройки валидации
export const popupElements = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input_error_active'
};

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
export const clearValidation = (formElement, popupElements) => {

    if(formElement) {
        const inputList = Array.from(formElement.querySelectorAll(popupElements.inputSelector));
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
  const regex = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/u;
  const regexFields = ["popup__input_name", "popup__input_description", "popup__input_card-name"];
  
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, popupElements);
  } else if (regexFields.includes(inputElement.id) && !regex.test(inputElement.value)) {
    showInputError(formElement, inputElement, "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы", popupElements);
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
