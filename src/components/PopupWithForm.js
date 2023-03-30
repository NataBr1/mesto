import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector,{handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupElement.querySelector('.popup__form');
    this._inputs = this._form.querySelectorAll('.popup__input');
    this._submitButton = this._form.querySelector('.popup__button');
    this._textOnSubmitButton = this._submitButton.textContent;
  }

  _getInputValues() {
    this._formValues = {};
    this._inputs.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  addRenderLoading() {
    this._submitButton.textContent = 'Сохранение...';
  }

  startRenderLoading() {
    this._submitButton.textContent = this._textOnSubmitButton;
  }
}
