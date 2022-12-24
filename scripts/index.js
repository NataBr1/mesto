const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__closed');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');

const formElement = document.querySelector('.popup__form');

let nameInput = formElement.querySelector('.popup_input_name');
const jobInput = formElement.querySelector('.popup_input_job');
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

