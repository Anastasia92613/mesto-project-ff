let currentContainer;
let currentButtonClose;

function closePopup() {
  currentContainer.classList.remove('popup_is-opened');
  currentContainer.classList.remove('popup_is-animated');
  document.removeEventListener('keydown', closePopupBuEsc); 
  document.removeEventListener('click', closePopupByOverlay);
  currentButtonClose.removeEventListener('click', closePopup);
};

function closePopupBuEsc (evt) {
  if (evt.key === 'Escape') {
    closePopup();
  };
};

function closePopupByOverlay(evt) {
  if (evt.target === currentContainer) {
    closePopup();
  };
};

//Открытие и закрытие попапа
export function handlePopup (container, buttonClose) {
  
  currentContainer = container;
  currentButtonClose = buttonClose;

  currentContainer.classList.toggle('popup_is-opened');
  currentContainer.classList.toggle('popup_is-animated');
  currentButtonClose.addEventListener('click', closePopup);
  document.addEventListener('keydown', closePopupBuEsc);
  document.addEventListener('click', closePopupByOverlay);
}