const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-42',
  headers: {
    authorization: '80ad5c90-3e58-45c5-a572-47f9b54721a7',
    'Content-Type': 'application/json'
  }
};

//Получение данных пользователя
export const getProfile = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: config.headers
    })
    .then(res => {
        if(res.ok) {
           return res.json();
        }
        return Promise.reject(`Ошибка при подгрузке данных профиля: ${res.status}`);
    })
};

//Редактирование данных пользователя
export const editProfile = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: about
        })
    })
    .then(res => {
        if(res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка при редактировании данных профиля: ${res.status}`);
    });
};

//Обновление аватара
export const updateAvatar = (avatar) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatar
        })
    })
    .then(res => {
        if(res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка обновления аватара: ${res.status}`);
    });
};

//Получение карточек
export const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers
  })
   .then(res => {
    if (res.ok) {
        return res.json();
    }
      return Promise.reject(`Ошибка при подгрузке карточек': ${res.status}`);
   })
};

//Добавление карточки
export const addCard = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
        .then(res => {
        if(res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка при добавлении новой карточки: ${res.status}`);
    });
};

//Удаление карточки
export const deletedCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then(res => {
        if(res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка при удалении карточки: ${res.status}`)
    });
};

//Проставление лайка карточки
export const putLikeCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers,
    })
    .then(res => {
        if(res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка проставления лайка карточки: ${res.status}`)
    });
};

//Удаление лайка карточки
export const deleteLikeCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,       
    })
    .then(res => {
        if(res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка удаления лайка карточки: ${res.status}`)
    });
};
