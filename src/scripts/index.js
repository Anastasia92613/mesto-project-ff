import { createCard, deleteCard, hendlerLikeCard } from './components/card.js';
import { handlePopup } from './components/modal.js';
import { enableValidation, popupElements } from './components/validation.js';
import { getCards, getProfile, editProfile, addCard, updateAvatar } from './components/api.js';

const mainContent = document.querySelector('.content')

//Элементы профиля
const containerEditProfile = document.querySelector('.popup_type_edit');
const containerProfile = mainContent.querySelector('.profile');
const buttonEditProfile = containerProfile.querySelector('.profile__edit-button');
const avatar = containerProfile.querySelector('.profile__image');

//Элементы попапа редактирования профиля
const formProfile = document.forms['edit-profile'];
const nameInput = formProfile.elements.name;
const jobInput = formProfile.elements.description;
const closeFormProfile = containerEditProfile.querySelector('.popup__close');
const currentName = containerProfile.querySelector('.profile__title');
const currentJob = containerProfile.querySelector('.profile__description');
const buttonProfileForm = formProfile.querySelector('.popup__button');

//Элементы попапа обновления аватара
const formAvatar = document.forms['edit-avatar'];
const containerEditAvatar = document.querySelector('.popup_type_edit-avatar');
const buttonCloseEditAvatar = containerEditAvatar.querySelector('.popup__close');
const linkAvatar = formAvatar.elements.link;
const buttonAvatarForm = formAvatar.querySelector('.popup__button');

//Элементы добавления карточек
const buttonAddCard = containerProfile.querySelector('.profile__add-button');
const containerNewCard = document.querySelector('.popup_type_new-card');
const formNewCard = document.forms['new-place'];
const namePlace = formNewCard.elements['place-name'];
const linkImage = formNewCard.elements.link;
const closeFormNewCard = containerNewCard.querySelector('.popup__close');
const buttonNewCardForm = formNewCard.querySelector('.popup__button');

//Блок с карточками
const containerPlaces = mainContent.querySelector('.places');
const cardsContainer = containerPlaces.querySelector('.places__list');

//Элементы попапа карточки
 const containerPopupCard = document.querySelector('.popup_type_image');
 const closePopupCard = containerPopupCard.querySelector('.popup__close');
 const titleCard = containerPopupCard.querySelector('.popup__caption');
 const imageCard = containerPopupCard.querySelector('.popup__image');
 const descriptionCard = containerPopupCard.querySelector('.popup__image');

const promises = [getProfile, getCards];
const preloadText = 'Сохранение...'
const defaultText = "Сохранить"

Promise.all(promises)
.then(([userData, cardsData]) => {
 //Заполняем данные профиля пользователя
  currentName.textContent = userData.name;
  currentJob.textContent = userData.about;
  avatar.setAttribute('style', `background-image: url(${userData.avatar})`);
  const userId = userData._id;

 //Подгружаем карточки
 cardsData.forEach(card => {
  cardsContainer.append(
    createCard(
      card.link,
      card.name,
      card.likes,
      card._id,
      userId,
      card.owner._id,
      deleteCard,
      hendlerLikeCard,
      openImage
    )
  )});
});

//Открытие и закрытие профиля
buttonEditProfile.addEventListener('click', () => {
  handlePopup(containerEditProfile, closeFormProfile);
  nameInput.value = currentName.textContent;
  jobInput.value = currentJob.textContent;
});

//Редактирование профиля
function handleFormProfileSubmit(evt) {
  evt.preventDefault();
  buttonProfileForm.textContent = preloadText;
  editProfile(nameInput.value, jobInput.value)
  .then(profileData => {
    currentName.textContent = profileData.name;
    currentJob.textContent = profileData.about;
    handlePopup(containerEditProfile, containerEditProfile.querySelector(popupElements.submitButtonSelector));
  })
  .catch((err) => {
    console.log('Ошибка при редактировании карточек', err);
  })
  .finally(() => {
    buttonProfileForm.textContent = defaultText;
  })
};

//Слушатель редактирования данных профиля
containerEditProfile.addEventListener('submit', handleFormProfileSubmit);

//Редактирование аватара
function editAvatar(evt) {
  evt.preventDefault();
  buttonAvatarForm.textContent = preloadText;
  updateAvatar(linkAvatar.value)
  .then(userData => {
    avatar.setAttribute('style', `background-image: url(${userData.avatar})`);
    handlePopup(containerEditAvatar, buttonCloseEditAvatar);
  })
  .catch((err) => {
    console.log('Ошибка при обновлении аватара', err)
  })
   .finally(() => {
    buttonAvatarForm.textContent = defaultText;
  })
};

//Открытие и закрытие редактирования аватара
avatar.addEventListener('click', () => {
  handlePopup(containerEditAvatar, buttonCloseEditAvatar);
});

//Слушатель редактирования аватара
formAvatar.addEventListener('submit', editAvatar);

//Открытие и закрытие изображения карточки
const openImage = (evt) => {
  handlePopup(containerPopupCard, closePopupCard);
  imageCard.setAttribute('src', evt.target.src);
  descriptionCard.setAttribute('alt', evt.target.alt);
  titleCard.textContent = evt.target.alt;
};

//Открытие и закрытие попапа создания новой карточки
buttonAddCard.addEventListener('click', () => handlePopup(containerNewCard, closeFormNewCard));

//Обработчик добавления новой карточки
const handleFormCardSubmit = (evt) => {
  evt.preventDefault();
  buttonNewCardForm.textContent = preloadText;
  addCard(namePlace.value, linkImage.value)
  .then(cardData => {
    cardsContainer.prepend(createCard(cardData.link, cardData.name, cardData.likes, card._id, cardData.owner._id, cardData.owner._id, deleteCard, hendlerLikeCard, openImage)); 
    handlePopup(containerNewCard, closeFormNewCard);
  })
   .finally(() => {
    buttonNewCardForm.textContent = defaultText;
  });
};

//Добавление новой карточки
containerNewCard.addEventListener('submit', handleFormCardSubmit);

//Вызов функции валидации полей формыы
enableValidation(popupElements);