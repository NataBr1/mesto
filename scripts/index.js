/* Открытие попап по кнопке Редактировать и закрытие попап по крестику */
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


/* Сохранение на странице введенных данных из формы */
let formElement = document.querySelector('.popup__form');

let nameInput = formElement.querySelector('.popup__input_name');
let jobInput = formElement.querySelector('.popup__input_job');
let saveAndClosePopup = formElement.querySelector('.popup__button');

let profileIntro = document.querySelector('.profile__intro');
let newProfileTitle = profileIntro.querySelector('.profile__title');
let newProfileSubtitle = profileIntro.querySelector('.profile__subtitle');

function handleFormSubmit (evt) {
    evt.preventDefault();
    nameInput.value;
    jobInput.value;
    newProfileTitle.textContent = nameInput.value;
    newProfileSubtitle.textContent = jobInput.value;
}
formElement.addEventListener('submit', handleFormSubmit);


/* Закрытие попап по кнопке Сохранить */
saveAndClosePopup.addEventListener('click', ClosePopup);

