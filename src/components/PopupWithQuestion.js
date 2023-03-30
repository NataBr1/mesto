import Popup from "./Popup.js";

export default class PopupWithQuestion extends Popup {
  constructor (popupSelector) {
    super (popupSelector);
    this._form = this._popupElement.querySelector('.popup__form');
  }

  submitCallback(removing) {
    this._handleFormSubmit = removing;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    });
  }
}
