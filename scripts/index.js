const container = document.querySelector('.places');
const cardsContainer = container.querySelector('.places__list');

function addCard(link, name) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const buttonsDelete = cardElement.querySelectorAll('.card__delete-button');

  cardElement.querySelector('.card__image').setAttribute('src', link);
  cardElement.querySelector('.card__image').setAttribute('alt', name);
  cardElement.querySelector('.card__title').textContent = name;

  cardsContainer.append(cardElement);

    buttonsDelete.forEach((button) => {
      button.addEventListener('click', function (evt) {
        const deletedCard = evt.target.closest('.card');
        deleteCard(deletedCard);
      });
    });
};

initialCards.forEach(card =>{addCard(card.link, card.name)});

function deleteCard (card) {
 card.remove();
};
