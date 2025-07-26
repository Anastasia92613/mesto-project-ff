const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

//Дизейбл кнопки формы
const toggleDisabledButton = (inputList, button, popupElements) => {
  if(hasInvalidInput(inputList)) {
    button.classList.add(popupElements.inactiveButtonClass);
    button.setAttribute('disabled', 'true');
  } else {
    button.classList.remove(popupElements.inactiveButtonClass);
    button.removeAttribute('disabled');
  };
};

// Добавление класса и сообщения с ошибкой на инпут формы
const showInputError = (formElement, inputElement, errorMessage, popupElements) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}_error`);
  inputElement.classList.add(popupElements.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(popupElements.errorClass);
};

// Функция, которая удаляет класс с ошибкой на инпут формы
const hideInputError = (formElement, inputElement, popupElements) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}_error`);

  if(errorElement) {
    inputElement.classList.remove(popupElements.inputErrorClass);
    errorElement.classList.remove(popupElements.errorClass);
    errorElement.textContent = '';
  };
};

//Функция очищения полей после валидации
export const clearValidation = (formElement, popupElements) => {

    if(formElement) {
        const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
        inputList.forEach((inputElement) => {
            hideInputError(formElement, inputElement, popupElements);
            formElement.reset();
            toggleDisabledButton(inputList, formElement.querySelector(popupElements.submitButtonSelector), popupElements);
        });      
    };
};

// Функция, которая проверяет валидность инпута формы
const checkInputValidity = (formElement, inputElement, popupElements) => {

    if (!inputElement.validity.valid) {
       return showInputError(formElement, inputElement, inputElement.validationMessage, popupElements);
    } 

    if (inputElement.validity.patternMismatch) {
       return showInputError(formElement, inputElement, inputElement.dataset.errorMessage, popupElements);
    } else {
       return hideInputError(formElement, inputElement, popupElements);
    };
};

//Собираем все инпуты и вешаем слушатель
const setEventListeners = (formElement, popupElements) => {
  const inputList = Array.from(formElement.querySelectorAll(popupElements.inputSelector));
  const buttonElement = formElement.querySelector(popupElements.submitButtonSelector);

  toggleDisabledButton(inputList, buttonElement, popupElements);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, popupElements);
      toggleDisabledButton(inputList, buttonElement, popupElements);
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