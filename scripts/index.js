const popup = document.querySelectorAll('.popup');
const popupElementUser = document.querySelector('.popup_user'); /* Попап с редактированием профиля */
const popupElementPlace = document.querySelector('.popup_place') /* Попап добавления карточки */
const popupUserContainer = popupElementUser.querySelector('.popup_user-container');
const popupCloseButtonElement = document.querySelectorAll('.popup__closed'); /*Кнопка закрытия попапов, крестик*/
const popupCloseButtonElementUser = popupElementUser.querySelector('.popup__closed_user'); /* Кнопка закрытия попапа профиля */
const popupOpenButtonElementUser = document.querySelector('.profile__edit-button'); /* Кнопка открытия попапа профиля */
const popupCloseButtonElementPlace = popupElementPlace.querySelector('.popup__closed_place'); /* Кнопка закрытия попапа новой карточки */
const popupOpenButtonElementPlace = document.querySelector('.profile__add-button'); /* Кнопка открытия попапа новой карточки */
const popupElementView = document.querySelector('.view'); /* Попап просмотра изображения */
const popupCloseButtonElementView = popupElementView.querySelector('.popup__closed_view'); /*Кнопка закрытия просмотра изображения*/
const elementGrid = document.querySelector('.elements'); /* Место для вставки template в HTML */
const template = document.querySelector('#cards').content; /* Находим template */
const viewCaption = popupElementView.querySelector('.view__caption');
const viewPhoto = popupElementView.querySelector('.view__photo');
const viewAttributeLink = popupElementView.querySelector('.view__photo');

// Ищем формы и инпуты по атрибуту name
const formElementUser = document.forms.popupFormUser;
const nameUserInput = formElementUser.elements.nameUser;
const jobInput = formElementUser.elements.jobUser;
const formElementPlace = document.forms.popupFormPlace;
const namePlaceInput = formElementPlace.elements.namePlace;
const linkInput = formElementPlace.elements.linkPlace;

// Ищем отображаемые на странице данные пользователя
const profileIntro = document.querySelector('.profile__intro');
const newProfileTitle = profileIntro.querySelector('.profile__title');
const newProfileSubtitle = profileIntro.querySelector('.profile__subtitle');

// Функция открытия попапов
function openPopup (popup) {
  popup.classList.add('popup_opened');
};

// Функция закрытия попапов
function closedPopup (popup) {
  popup.classList.remove('popup_opened');
};

// Функция открытия попапа профиля
popupOpenButtonElementUser.addEventListener('click', () => {
  nameUserInput.value = newProfileTitle.textContent;
  jobInput.value = newProfileSubtitle.textContent;
  openPopup(popupElementUser);
  clearHint();
  clearRedLine();
  enableValidation(popupElementUser);
});

// Функция открытия попапа добавления карточки
popupOpenButtonElementPlace.addEventListener('click', () => {
  openPopup(popupElementPlace);
  namePlaceInput.value = '';
  linkInput.value = '';
  clearHint();
  clearRedLine();
  enableValidation(popupElementPlace);
});

// Функиция закрытия всех попапов по крестику
popupCloseButtonElement.forEach((button, formElement) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closedPopup(popup));
});

//Закрытие по Esc
document.addEventListener('keydown', function(evt) {
  const popupElements = Array.from(document.querySelectorAll('.popup'))
  popupElements.forEach(popupElement => {
    if (evt.key === 'Escape') {
      closedPopup(popupElement)
    };
  });
});

//Закрытие по оверу
document.addEventListener('click', (evt) => {
  if(evt.target.classList.contains('popup')) {
    closedPopup(evt.target)
  };
});

//Функция скрытия красной линии под неавалидным полем, применяем при открытии попапа второй раз
function clearRedLine() {
  const inputs = Array.from(document.querySelectorAll('.popup__input'));
  inputs.forEach(input => {
    input.classList.remove('popup__input_type_error');
  });
};

// Функция скрытия подсказок об ошибках заполнения полей, применяем при открытии попапа второй раз
function clearHint() {
  const errorElements = Array.from(document.querySelectorAll('.popup__input-error'));
  errorElements.forEach(errorElement => errorElement.textContent = '');
};

// Сохранение новых данных о пользователе на странице
function handleFormUserSubmit (evt) {
    evt.preventDefault();
    newProfileTitle.textContent = nameUserInput.value;
    newProfileSubtitle.textContent = jobInput.value;
    closedPopup(popupElementUser);
}
formElementUser.addEventListener('submit', handleFormUserSubmit);

// Отображение карточек из массива
const createCards = (item) => {
  const card = template.querySelector('.element').cloneNode(true);
  const namePlace = card.querySelector('.element__title');
  const linkPlace = card.querySelector('.element__photo');
  const attributeAltPlace = card.querySelector('.element__photo');

  namePlace.textContent = item.name;
  linkPlace.src = item.link;
  attributeAltPlace.alt = item.name;

  // Вызываем функции лайка, удаления карточки и просмотра изображения
  addLike(card);
  removeCard(card);
  zoomPhoto(linkPlace, item);

  return card;
};

// Рендеринг карточек
const renderCards = (item) => {
  elementGrid.append(createCards(item));
};

// Перебор массива с карточками
initialCards.forEach((item) => {
  renderCards(item);
});

// Функция просмотра фотографии в зуме
function zoomPhoto(linkPlace, item) {
  linkPlace.addEventListener('click', () => {
    openPopup(popupElementView);
    viewCaption.textContent = item.name;
    viewPhoto.src = item.link;
    viewAttributeLink.alt = item.name;
  });
}

// Функция удаления карточек
function removeCard(card) {
  card.querySelector('.element__delete').addEventListener('click', () => {
    card.remove();
  });
}

// Функция добавления лайка карточкам
function addLike(card) {
  card.querySelector('.element__like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__like_active');
  });
}

// Добавление новой карточки
function handleFormPLaceSubmit (evt) {
  evt.preventDefault();
  elementGrid.prepend(createCards({
      name: namePlaceInput.value,
      link: linkInput.value,
    }));
  closedPopup(popupElementPlace);
  namePlaceInput.value = '';
  linkInput.value = '';
};

formElementPlace.addEventListener('submit', handleFormPLaceSubmit);


