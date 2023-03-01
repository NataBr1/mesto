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

const userFormValidator = new FormValidation(objForValidation, popupElementUser);
userFormValidator.enableValidation(popupElementUser);

const placeFormValidator = new FormValidation(objForValidation, popupElementPlace);
placeFormValidator.enableValidation(popupElementPlace);


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
  userFormValidator.resetValidation();
});

// Функция открытия попапа добавления карточки
popupOpenButtonElementPlace.addEventListener('click', () => {
  openPopup(popupElementPlace);
  namePlaceInput.value = '';
  linkInput.value = '';
  placeFormValidator.resetValidation();
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

// Сохранение новых данных о пользователе на странице
function handleFormUserSubmit (evt) {
    evt.preventDefault();
    newProfileTitle.textContent = nameUserInput.value;
    newProfileSubtitle.textContent = jobInput.value;
    closedPopup(popupElementUser);
}
formElementUser.addEventListener('submit', handleFormUserSubmit);

// Функция просмотра фотографии в зуме
function handleZoomPhoto(name, link) {
  openPopup(popupElementView);
  viewCaption.textContent = name;
  viewPhoto.src = link;
  viewPhoto.alt = name;
};

// Отрисовка карточек
const createCard = (data) => {
  const card = new Card(data, '#cards', handleZoomPhoto);
  const elementList = card.generateCard();
  return elementList;
}

initialCards.forEach((item) => {
  elementGrid.append(createCard(item));
});


// Добавление новой карточки
const addCard = (data) => {
  elementGrid.prepend(createCard(data, handleZoomPhoto));
};

function handleFormPLaceSubmit (evt) {
  evt.preventDefault();
  const elementList = {
    name: namePlaceInput.value,
    link: linkInput.value,
    handleZoomPhoto: handleZoomPhoto
  }
  addCard(elementList);
  closedPopup(popupElementPlace);
};

formElementPlace.addEventListener('submit', handleFormPLaceSubmit);
