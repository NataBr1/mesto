const popupElementUser = document.querySelector('.popup_user'); /* Попап с редактированием профиля */
const popupElementPlace = document.querySelector('.popup_place') /* Попап добавления карточки */
const popupCloseButtonElementUser = popupElementUser.querySelector('.popup__closed_user'); /* Кнопка закрытия попапа профиля */
const popupOpenButtonElementUser = document.querySelector('.profile__edit-button'); /* Кнопка открытия попапа профиля */
const popupCloseButtonElementPlace = popupElementPlace.querySelector('.popup__closed_place'); /* Кнопка закрытия попапа новой карточки */
const popupOpenButtonElementPlace = document.querySelector('.profile__add-button'); /* Кнопка открытия попапа новой карточки */
const popupElementView = document.querySelector('.view'); /* Попап просмотра изображения */
const popupCloseButtonElementView = popupElementView.querySelector('.popup__closed_view'); /*Кнопка закрытия просмотра изображения*/

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

/* Функция открытия/закрытия попапа профиля */
const openPopupUser = function() {
  popupElementUser.classList.toggle('popup_opened');
  nameUserInput.value = newProfileTitle.textContent;
  jobInput.value = newProfileSubtitle.textContent;
};

/* Функция открытия/закрытия попапа новой карточки */
const openPopupPlace = function() {
  popupElementPlace.classList.toggle('popup_opened');
}
console.log(1)

/* Функция открыти/закрытия попапа просмотра изображения */
const openPopupView = function() {
  popupElementView.classList.toggle('popup_opened');
}
console.log(2)

/* Вешаем слушателей на кнопки управления открытием/закрытием попапов */
popupOpenButtonElementUser.addEventListener('click', openPopupUser);
popupCloseButtonElementUser.addEventListener('click', openPopupUser);
popupOpenButtonElementPlace.addEventListener('click', openPopupPlace);
popupCloseButtonElementPlace.addEventListener('click', openPopupPlace);
popupCloseButtonElementView.addEventListener('click', openPopupView);
console.log(3)

/* Сохранение новых данных о пользователе на странице */
function handleFormUserSubmit (evt) {
    evt.preventDefault();
    newProfileTitle.textContent = nameUserInput.value;
    newProfileSubtitle.textContent = jobInput.value;
    popupElementUser.classList.remove('popup_opened');
}
formElementUser.addEventListener('submit', handleFormUserSubmit);

console.log(4)
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

/* Отображение карточек из массива */
const createCards = (item) => {
  const card = template.content.querySelector('.element').cloneNode(true);
  const namePlace = card.querySelector('.element__title');
  namePlace.textContent = item.name;
  const linkPlace = card.querySelector('.element__photo');
  linkPlace.src = item.link;
  const attributeAltPlace = card.querySelector('.element__photo');
  attributeAltPlace.alt = item.name;
console.log(5)
  /* Лайк */
  card.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  });

  /* Удаление карточек */
  card.querySelector('.element__delete').addEventListener('click', function () {
    card.remove();
  })
console.log(6)
  /*Просмотр изображения*/
 linkPlace.addEventListener('click', function() {
    openPopupView(item);
    popupElementView.querySelector('.view__caption').textContent = item.name;
    popupElementView.querySelector('.view__photo').src = item.link;
    popupElementView.querySelector('.view__photo').alt = item.name;
  });
console.log(7)
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
      link: linkInput.value
    }));

  popupElementPlace.classList.remove('popup_opened');
};

formElementPlace.addEventListener('submit', handleFormPLaceSubmit);
