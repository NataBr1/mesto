const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__closed');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');

const OpenPopup = function() {
  popupElement.classList.add('popup_is-opened');
};

const ClosePopup = function() {
  popupElement.classList.remove('popup_is-opened');
};

popupOpenButtonElement.addEventListener('click', OpenPopup);
popupCloseButtonElement.addEventListener('click', ClosePopup);

