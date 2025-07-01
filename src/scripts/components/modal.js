
  function closePopup(container, buttonClose) {
    container.classList.remove('popup_is-opened');
    container.classList.remove('popup_is-animated');
    document.removeEventListener('keydown', closePopupBuEsc); 
    document.removeEventListener('click', closePopupByOverlay);
    buttonClose.removeEventListener('click', closePopup);
  };

    function closePopupBuEsc (evt, container, buttonClose) {
    if (evt.key === 'Escape') {
      closePopup(container, buttonClose);
    };
  };

    function closePopupByOverlay(evt, container, buttonClose) {
    if (evt.target === container) {
      closePopup(container, buttonClose);
    };
  };


//Открытие и закрытие попапа
export function handlePopup (container, buttonClose) {
  container.classList.toggle('popup_is-opened');
  container.classList.toggle('popup_is-animated');
  buttonClose.addEventListener('click', () => closePopup(container, buttonClose));
  document.addEventListener('keydown', (evt) =>  closePopupBuEsc (evt, container, buttonClose));
  document.addEventListener('click', (evt) => closePopupByOverlay (evt, container, buttonClose));
}