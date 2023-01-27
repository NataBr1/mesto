const popupElementUser = document.querySelector('.popup_user'); /* Попап с редактированием профиля */
const popupElementPlace = document.querySelector('.popup_place') /* Попап добавления карточки */
const popupCloseButtonElement = document.querySelectorAll('.popup__closed'); /*Кнопка закрытия попапов, крестик*/
const popupCloseButtonElementUser = popupElementUser.querySelector('.popup__closed_user'); /* Кнопка закрытия попапа профиля */
const popupOpenButtonElementUser = document.querySelector('.profile__edit-button'); /* Кнопка открытия попапа профиля */
const popupCloseButtonElementPlace = popupElementPlace.querySelector('.popup__closed_place'); /* Кнопка закрытия попапа новой карточки */
const popupOpenButtonElementPlace = document.querySelector('.profile__add-button'); /* Кнопка открытия попапа новой карточки */
const popupElementView = document.querySelector('.view'); /* Попап просмотра изображения */
const popupCloseButtonElementView = popupElementView.querySelector('.popup__closed_view'); /*Кнопка закрытия просмотра изображения*/
const elementGrid = document.querySelector('.elements'); /* Место для вставки template в HTML */
const template = document.querySelector('#cards'); /* Находим template */
const viewCaption = popupElementView.querySelector('.view__caption');
const viewPhoto = popupElementView.querySelector('.view__photo');
const viewAttributeLink = popupElementView.querySelector('.view__photo');

/* Ищем формы и инпуты */
const formElementUser = document.querySelector('.popup__form_user');
const nameUserInput = formElementUser.querySelector('.popup__input_type_name');
const jobInput = formElementUser.querySelector('.popup__input_type_job');
const formElementPlace = document.querySelector('.popup__form_place');
const namePlaceInput = formElementPlace.querySelector('.popup__input_type_name');
const linkInput = formElementPlace.querySelector('.popup__input_type_link');

/* Ищем отображаемые на странице данные пользователя */
const profileIntro = document.querySelector('.profile__intro');
const newProfileTitle = profileIntro.querySelector('.profile__title');
const newProfileSubtitle = profileIntro.querySelector('.profile__subtitle');

/*Функция открытия попапов*/
const openPopup = function(popup) {
  popup.classList.add('popup_opened');
};

/*Функция закрытия попапов*/
const closedPopup = function(popup) {
  popup.classList.remove('popup_opened');
};

/* Функция открытия попапа профиля */
popupOpenButtonElementUser.addEventListener('click', function() {
  nameUserInput.value = newProfileTitle.textContent;
  jobInput.value = newProfileSubtitle.textContent;
  openPopup(popupElementUser);
});

/* Функция открытия попапа добавления карточки */
popupOpenButtonElementPlace.addEventListener('click', function() {
  openPopup(popupElementPlace);
});

/* Функиция закрытия всеъ попапов */
popupCloseButtonElement.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closedPopup(popup));
});

/* Сохранение новых данных о пользователе на странице */
function handleFormUserSubmit (evt) {
    evt.preventDefault();
    newProfileTitle.textContent = nameUserInput.value;
    newProfileSubtitle.textContent = jobInput.value;
    closedPopup(popupElementUser);
}
formElementUser.addEventListener('submit', handleFormUserSubmit);

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

/* Отображение карточек из массива */
const createCards = (item) => {
  const card = template.content.querySelector('.element').cloneNode(true);
  const namePlace = card.querySelector('.element__title');
  namePlace.textContent = item.name;
  const linkPlace = card.querySelector('.element__photo');
  linkPlace.src = item.link;
  const attributeAltPlace = card.querySelector('.element__photo');
  attributeAltPlace.alt = item.name;

  /* Лайк */
  card.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  });

  /* Удаление карточек */
  card.querySelector('.element__delete').addEventListener('click', function () {
    card.remove();
  })

  /*Просмотр изображения*/
 linkPlace.addEventListener('click', function() {
    openPopup(popupElementView);
    viewCaption.textContent = item.name;
    viewPhoto.src = item.link;
    viewAttributeLink.alt = item.name;
  });

  return card;
};

/* Рендеринг карточек */
const renderCards = (item) => {
  elementGrid.append(createCards(item));
};

/* Перебор массива с карточками*/
initialCards.forEach((item) => {
  renderCards(item);
});

/* Добавление новой карточки */
function handleFormPLaceSubmit (evt) {
  evt.preventDefault();
  elementGrid.prepend(createCards(
    {
      name: namePlaceInput.value,
      link: linkInput.value,
    }));
  closedPopup(popupElementPlace);
  namePlaceInput.value = '';
  linkInput.value = '';
};

formElementPlace.addEventListener('submit', handleFormPLaceSubmit);
