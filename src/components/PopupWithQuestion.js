import Popup from "./Popup.js";

export default class PopupWithQuestion extends Popup {
  constructor (popupSelector, {handleFormSubmit}) {
    super (popupSelector);
    this._form = this._popupElement.querySelector('.popup__form');
    this._handleFormSubmit = handleFormSubmit;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleDeleteCard();
      this.close();
    });
  }
}
