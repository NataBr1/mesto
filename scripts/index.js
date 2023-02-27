import Card from './Сard.js';
import {initialCards} from './array.js'
import FormValidation from './FormValidator.js';

const popups = document.querySelectorAll('.popup');
const popupElementUser = document.querySelector('.popup_user'); /* Попап с редактированием профиля */
const popupElementPlace = document.querySelector('.popup_place') /* Попап добавления карточки */
const popupOpenButtonElementUser = document.querySelector('.profile__edit-button'); /* Кнопка открытия попапа профиля */
const popupOpenButtonElementPlace = document.querySelector('.profile__add-button'); /* Кнопка открытия попапа новой карточки */
const popupElementView = document.querySelector('.view'); /* Попап просмотра изображения */
const elementGrid = document.querySelector('.elements'); /* Место для вставки template в HTML */
const viewCaption = popupElementView.querySelector('.view__caption');
const viewPhoto = popupElementView.querySelector('.view__photo');

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

const objForValidation = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error', //красная линия
  errorClass: 'popup__input-error_active' //сообщение об ошибке
});


// Функция открытия попапов
function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
};

// Функция закрытия попапов
function closedPopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
};

// Функция открытия попапа профиля
popupOpenButtonElementUser.addEventListener('click', () => {
  nameUserInput.value = newProfileTitle.textContent;
  jobInput.value = newProfileSubtitle.textContent;
  openPopup(popupElementUser);
  clearHint();
  clearRedLine();
  disabledPopupButton(objForValidation);
});

// Функция открытия попапа добавления карточки
popupOpenButtonElementPlace.addEventListener('click', () => {
  openPopup(popupElementPlace);
  namePlaceInput.value = '';
  linkInput.value = '';
  clearHint();
  clearRedLine();
  disabledPopupButton(objForValidation);
});

// Функция закрытия попапов по крестику и оверлею
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        closedPopup(popup)
      }
      if (evt.target.classList.contains('popup__closed')) {
        closedPopup(popup)
      }
  })
});

//Функция закрытия попапа по Esc
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closedPopup(openedPopup);
  };
};

//Функция скрытия красной линии под невалидным полем, применяем при открытии попапа второй раз
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

//Функция деактивации кнопки submit
function disabledPopupButton(object) {
  const popupButtons = Array.from(document.querySelectorAll('.popup__button'));
  popupButtons.forEach(buttonElement => {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(object.inactiveButtonClass);
  })
}

// Сохранение новых данных о пользователе на странице
function handleFormUserSubmit (evt) {
    evt.preventDefault();
    newProfileTitle.textContent = nameUserInput.value;
    newProfileSubtitle.textContent = jobInput.value;
    closedPopup(popupElementUser);
}
formElementUser.addEventListener('submit', handleFormUserSubmit);

// Функция просмотра фотографии в зуме
function zoomPhoto(name, link) {
  openPopup(popupElementView);
  viewCaption.textContent = name;
  viewPhoto.src = link;
  viewPhoto.alt = name;
};

// Отрисовка карточек
initialCards.forEach((item) => {
  const card = new Card(item, zoomPhoto);
  const cardElement = card.generateCard();

  elementGrid.append(cardElement);
});

const createCard = (data, zoomPhoto) => {
  const card = new Card(data, zoomPhoto);
  const elementList = card.generateCard();
  return elementList;
}

// Добавление новой карточки
const addCard = (data) => {
  elementGrid.prepend(createCard(data, zoomPhoto));
};

function handleFormPLaceSubmit (evt) {
  evt.preventDefault();
  const elementList = {
    name: namePlaceInput.value,
    link: linkInput.value,
    zoomPhoto: zoomPhoto
  }

  addCard(elementList);
  closedPopup(popupElementPlace);
};

formElementPlace.addEventListener('submit', handleFormPLaceSubmit);

// Валидация форм
const forms = Array.from(document.querySelectorAll('.popup__form'));
  forms.forEach((formElement) => {
    const valid = new FormValidation(objForValidation, formElement);
    valid.enableValidation();
  });

