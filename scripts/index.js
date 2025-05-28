const container = document.querySelector('.places');
const cardsContainer = container.querySelector('.places__list');

function createCard(link, name, deleteCard) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const buttonDelete = cardElement.querySelector('.card__delete-button');

  cardElement.querySelector('.card__image').setAttribute('src', link);
  cardElement.querySelector('.card__image').setAttribute('alt', name);
  cardElement.querySelector('.card__title').textContent = name;
  
  buttonDelete.addEventListener('click',function (evt) { 
    const deletedCard = evt.target.closest('.card');
    deleteCard(deletedCard);
   });

  return cardElement;
};

initialCards.forEach(card =>{cardsContainer.append(createCard(card.link, card.name, deleteCard))});

function deleteCard (card) {
 card.remove();
};
