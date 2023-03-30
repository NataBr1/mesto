export const popups = document.querySelectorAll('.popup');
export const popupElementUser = document.querySelector('.popup_user'); /* Попап с редактированием профиля */
export const popupElementPlace = document.querySelector('.popup_place') /* Попап добавления карточки */
export const popupOpenButtonElementUser = document.querySelector('.profile__edit-button'); /* Кнопка открытия попапа профиля */
export const popupOpenButtonElementPlace = document.querySelector('.profile__add-button'); /* Кнопка открытия попапа новой карточки */
export const buttonEditAvatar = document.querySelector('.profile__avatar-edit');
export const popupElementView = document.querySelector('.view'); /* Попап просмотра изображения */
export const popupElementAvatar = document.querySelector('.popup_avatar')
export const formElementUser = document.forms.popupFormUser;
export const nameUserInput = formElementUser.elements.nameUser;
export const jobInput = formElementUser.elements.jobUser;
export const submitButtons = document.querySelectorAll('.popup__button');

export const objForValidation = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error', //красная линия
  errorClass: 'popup__input-error_active' //сообщение об ошибке
});
