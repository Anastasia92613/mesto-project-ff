import { putLikeCard, deleteLikeCard } from "./api.js"

//создание карточки по шаблону
export const createCard = (link, name, likes, cardId, userId, ownerId, openedPopupDeletedCard, hendlerLikeCard, openImage) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const buttonDelete = cardElement.querySelector('.card__delete-button');
  const buttonLike = cardElement.querySelector('.card__like-button');
  const countLike = cardElement.querySelector('.card__like-count');
  const cardImage = cardElement.querySelector('.card__image');

  //Наполнение карточки
  cardElement.querySelector('.card__image').setAttribute('src', link);
  cardElement.querySelector('.card__image').setAttribute('alt', name);
  cardElement.querySelector('.card__title').textContent = name;
  countLike.textContent = likes.length;
  
  //Проверка на отображение иконки удаления
  if(userId !== ownerId) {
    buttonDelete.classList.add('card__delete-button-disabled');
  };

  //Проверка на отображение проставленного лайка
  likes.forEach(like => {
    if(userId === like._id) {
      buttonLike.classList.add('card__like-button_is-active');
    };
  });
  
  //Слушатель открытия попапа удаления карточки
  buttonDelete.addEventListener('click',function (evt) { 
    const deletedCard = evt.target.closest('.card');
    openedPopupDeletedCard(cardId, deletedCard);
  });

  //Слушатель на кнопку лайка карточки
  buttonLike.addEventListener('click', async(evt) => {
    const likedCard = evt.target.closest('.card');
    await hendlerLikeCard(likedCard, cardId, likes, countLike, userId);
  });

  cardImage.addEventListener('click', function(evt) {
    openImage(evt);
  });

  return cardElement;
};

//Лайк карточки
export async function hendlerLikeCard (card, cardId, likes, countLike, userId) {
  const buttonLike = card.querySelector('.card__like-button');
  let isLiked = likes.some(like => like._id === userId);

  try {
  const updatedCard = isLiked ? await deleteLikeCard(cardId) : await putLikeCard(cardId);
  likes.length = 0; 
  likes.push(...updatedCard.likes); 
  
  const count = updatedCard.likes;
  buttonLike.classList.toggle('card__like-button_is-active');
  countLike.textContent = count.length;

  } catch (err) {
  console.log('Ошибка удаления лайка карточкии', err);
  }

};

