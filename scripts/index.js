const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__closed');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');

const formElement = document.querySelector('.popup__form');

const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_job');
const saveAndClosePopup = formElement.querySelector('.popup__button');

const profileIntro = document.querySelector('.profile__intro');
const newProfileTitle = profileIntro.querySelector('.profile__title');
const newProfileSubtitle = profileIntro.querySelector('.profile__subtitle');

const openPopup = function() {
  popupElement.classList.add('popup_is-opened');
  nameInput.value = newProfileTitle.textContent;
  jobInput.value = newProfileSubtitle.textContent;
};

const closePopup = function() {
  popupElement.classList.remove('popup_is-opened');
};

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);

function handleFormSubmit (evt) {
    evt.preventDefault();
    newProfileTitle.textContent = nameInput.value;
    newProfileSubtitle.textContent = jobInput.value;
    closePopup();
}

formElement.addEventListener('submit', handleFormSubmit);


/* Массив с карточками */
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

/* Место для вставки template в HTML */
const elementGrid = document.querySelector('.elements');
/* Находим template */
const template = document.querySelector('#cards');

/* Создание и наполнение карточки */
const createCards = (item) => {
  const card = template.content.querySelector('.element').cloneNode(true);
  card.querySelector('.element__photo').src = item.link;
  card.querySelector('.element__photo').alt = item.name;
  card.querySelector('.element__title').textContent = item.name;

  return card;
}

/* Рендеринг карточек */
const renderCards = (item) => {
  elementGrid.append(createCards(item))
};

/* Перебор массива */
initialCards.forEach((item) => {
  renderCards(item)
});
