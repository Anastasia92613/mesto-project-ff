import { initialCards } from './cards.js';
import { createCard, deleteCard, likeCard } from './components/card.js';
import { handlePopup } from './components/modal.js';

//Элементы профиля
const containerEditProfile = document.querySelector('.popup_type_edit');
const containerProfile = document.querySelector('.profile');
const buttonEditProfile = containerProfile.querySelector('.profile__edit-button');
const formProfile = document.forms['edit-profile'];
const nameInput = formProfile.elements.name;
const jobInput = formProfile.elements.description;
const closeFormProfile = containerEditProfile.querySelector('.popup__close');
const currentName = containerProfile.querySelector('.profile__title');
const currentJob = containerProfile.querySelector('.profile__description');

//Элементы добавления карточек
const buttonAddCard = containerProfile.querySelector('.profile__add-button');
const containerNewCard = document.querySelector('.popup_type_new-card');
const formNewCard = document.forms['new-place'];
const namePlace = formNewCard.elements['place-name'];
const linkImage = formNewCard.elements.link;
const closeFormNewCard = containerNewCard.querySelector('.popup__close');

//Блок с карточками
const containerPlaces = document.querySelector('.places');
const cardsContainer = containerPlaces.querySelector('.places__list');

//Добавление карточек на страницу
initialCards.forEach(card =>{cardsContainer.append(createCard(card.link, card.name, deleteCard, likeCard, openImage))});

//Открытие и закрытие профиля
buttonEditProfile.addEventListener('click', (evt) => {
  handlePopup(containerEditProfile, closeFormProfile);
  nameInput.value = currentName.textContent;
  jobInput.value = currentJob.textContent;
});

//Редактирование профиля
function handleFormProfileSubmit(evt) {
  evt.preventDefault();
  currentName.textContent = nameInput.value;
  currentJob.textContent = jobInput.value;
};

containerEditProfile.addEventListener('submit', handleFormProfileSubmit);

//Открытие и закрытие изображения карточки
function openImage (evt) {
 const containerPopupCard = document.querySelector('.popup_type_image');
 const closePopupCard = containerPopupCard.querySelector('.popup__close');

  handlePopup(containerPopupCard, closePopupCard);
  containerPopupCard.querySelector('.popup__image').setAttribute('src', evt.target.src);
  containerPopupCard.querySelector('.popup__image').setAttribute('alt', evt.target.alt);
};


//Открытие и закрытие попапа создания новой карточки
buttonAddCard.addEventListener('click', () => handlePopup(containerNewCard, closeFormNewCard));

//Обработчик добавления новой карточки
function handleFormCardSubmit (evt) {
  evt.preventDefault();
  cardsContainer.prepend(createCard(linkImage.value, namePlace.value, deleteCard)); 
  linkImage.value = '';
  namePlace.value = '';
  handlePopup(containerNewCard, closeFormNewCard);
}

//Добавление новой карточки
containerNewCard.addEventListener('submit', handleFormCardSubmit);
