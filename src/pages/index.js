import Card from '../components/Сard.js';
import Section from '../components/Section.js';
import FormValidation from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserIfo.js';
import {initialCards} from '../utils/array.js';
import {objForValidation} from '../utils/constants.js';
import {popupElementUser,
        popupElementPlace,
        popupOpenButtonElementUser,
        popupOpenButtonElementPlace,
        nameUserInput,
        jobInput} from '../utils/constants.js';

import './index.css';

//Создаем экземпляр класса профиля
const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  jobSelector: '.profile__subtitle',
});


//Функция открытия попапа просмотра изображения
function handleCardClick(name, link) {
  const viewPhoto = new PopupWithImage('.view');
  viewPhoto.open(name, link);
};


//Функция добавления новой карточки
function createCard(cardData) {
  const card = new Card(cardData, '#cards', handleCardClick);
  const elementList = card.generateCard();
  return elementList;
};

//Создаем экземпляр класса Section
const defaultCardList = new Section ({
  items: initialCards,
  renderer: (cardData) => {
    defaultCardList.addItem(createCard(cardData));
  }
}, '.elements');
defaultCardList.renderItems();


//Создаем экземплряр класса добавления карточки
const popupAddPlace = new PopupWithForm('.popup_place', {
  handleFormSubmit: (placeData) => {
    defaultCardList.addItem(createCard(placeData));
    }
})
popupAddPlace.setEventListeners();

// Слушатель на кнопку добавления карточки
popupOpenButtonElementPlace.addEventListener('click', () => {
  popupAddPlace.open();
  placeFormValidator.resetValidation();
});


//Создаем экземпляр класса редактирования профиля
const popupEditProfile = new PopupWithForm('.popup_user', {
  handleFormSubmit: ({nameUser, jobUser}) => {
    userInfo.setUserInfo(nameUser, jobUser);
  }
});
popupEditProfile.setEventListeners();

// Слушатель на кнопку редактирования профиля
popupOpenButtonElementUser.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  nameUserInput.value = userInfo.getUserInfo().userName;
  jobInput.value = userInfo.getUserInfo().userJob
  popupEditProfile.open();
  userFormValidator.resetValidation();
});


// Создаем экземпляр класса просмотра изображения
const popupWithImage = new PopupWithImage('.view');
popupWithImage.setEventListeners();


// Создаем экземпляры класса валидации для форм
const userFormValidator = new FormValidation(objForValidation, popupElementUser);
userFormValidator.enableValidation(popupElementUser);

const placeFormValidator = new FormValidation(objForValidation, popupElementPlace);
placeFormValidator.enableValidation(popupElementPlace);
