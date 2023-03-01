// ВАЛИДАЦИЯ ФОРМ

export default class FormValidation {
  constructor (object, formElement) {
    this._formSelector = object.formSelector;
    this._inputSelector = object.inputSelector;
    this._submitButtonSelector = object.submitButtonSelector;
    this._inactiveButtonClass = object.inactiveButtonClass;
    this._inputErrorClass = object.inputErrorClass;
    this._errorClass = object.errorClass;
    this._formElement = formElement;
    this._inputs = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  }

  // Включение стилизации ошибок ввода
  _showInputError (inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  // Выключение стилизации ошибок ввода
  _hideInputError (inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  // Проверка поля на валидность
  _checkInputValidity (inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement, inputElement.validationMessage);
    }
  };

  // Добавляем обработчик всем полям формы
  _setEventListeners () {
    this._toggleButtonState();
    this._inputs.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

  // Проверка на валидность массива полей
  _hasInvalidInput () {
    return this._inputs.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  // Деактивация кнопки сабмит
  _inactiveButton() {
    this._buttonElement.setAttribute('disabled', true);
    this._buttonElement.classList.add(this._inactiveButtonClass);
  }

  // Метод сброса валидации
  resetValidation = () => {
    this._inactiveButton();
    this._inputs.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  // Переключение кнопки СОХРАНИТЬ с активной на неактивную и наоборот
  _toggleButtonState () {
    if (this._hasInvalidInput()) {
      this._inactiveButton;
    } else {
      this._buttonElement.removeAttribute('disabled');
      this._buttonElement.classList.remove(this._inactiveButtonClass);
    }
  };

  enableValidation () {
    this._setEventListeners();
  };

};
