//Открытие и закрытие попапа
export function handlePopup (container, buttonClose) {
  container.classList.toggle('popup_is-opened');
   container.classList.toggle('popup_is-animated');
  
  function closePopup() {
    container.classList.remove('popup_is-opened');
    container.classList.remove('popup_is-animated');
    document.removeEventListener('keydown', closePopupBuEsc); 
    document.removeEventListener('click', closePopupByOverlay);
    buttonClose.removeEventListener('click', closePopup);
  };

  function closePopupBuEsc (evt) {
    if (evt.key === 'Escape') {
      closePopup();
    };
  };

  function closePopupByOverlay(evt) {
    if (evt.target === container) {
      closePopup();
    };
  };

  buttonClose.addEventListener('click', closePopup);
  document.addEventListener('keydown', closePopupBuEsc);
  document.addEventListener('click', closePopupByOverlay);
}