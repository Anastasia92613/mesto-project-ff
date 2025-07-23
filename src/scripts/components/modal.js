let currentContainer;
let currentButtonClose;

export const closePopup = () => {
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
export const openPopup = (container, buttonClose) => {
  currentContainer = container;
  currentButtonClose = buttonClose;

  currentContainer.classList.add('popup_is-opened');
  currentContainer.classList.add('popup_is-animated');
  document.addEventListener('keydown', closePopupBuEsc);
  document.addEventListener('click', closePopupByOverlay);
  currentButtonClose.addEventListener('click', closePopup);
};
