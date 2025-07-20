import { popupElements, clearValidation} from './validation';

let currentContainer;
let currentButtonClose;

const closePopup = () => {
  currentContainer.classList.remove('popup_is-opened');
  currentContainer.classList.remove('popup_is-animated');
  document.removeEventListener('keydown', closePopupBuEsc); 
  document.removeEventListener('click', closePopupByOverlay);
  currentButtonClose.removeEventListener('click',closePopup);
};

const closePopupBuEsc = (evt) => {
  if (evt.key === 'Escape') {
    closePopup();
  };
};

const closePopupByOverlay = (evt) => {
  if (evt.target === currentContainer) {
    closePopup();
  };
};

//Открытие и закрытие попапа
export const handlePopup = (container, buttonClose) => {
  currentContainer = container;
  currentButtonClose = buttonClose;
  const formElement = container.querySelector(popupElements.formSelector);

  clearValidation(formElement, popupElements);

  currentContainer.classList.toggle('popup_is-opened');
  currentContainer.classList.toggle('popup_is-animated');
  document.addEventListener('keydown', closePopupBuEsc);
  document.addEventListener('click', closePopupByOverlay);
  currentButtonClose.addEventListener('click', closePopup);
};

//Дизейбл кнопки формы
export const disabledButton = (button, marker, popupElements) => {
  if(marker) {
    button.classList.add(popupElements.inactiveButtonClass);
    button.setAttribute('disabled', 'true');
  } else {
    button.classList.remove(popupElements.inactiveButtonClass);
    button.removeAttribute('disabled');
  };
};
