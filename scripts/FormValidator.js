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
    const inputs = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputs, buttonElement);
    inputs.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputs, buttonElement);
      });
    });
  };

  // Проверка на валидность массива полей
  _hasInvalidInput (inputs) {
    return inputs.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  // Переключение кнопки СОХРАНИТЬ с активной на неактивную и наоборот
  _toggleButtonState (inputs, buttonElement) {
    if (this._hasInvalidInput(inputs)) {
      buttonElement.setAttribute('disabled', true);
      buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      buttonElement.removeAttribute('disabled');
      buttonElement.classList.remove(this._inactiveButtonClass);
    }
  };

  enableValidation () {
    this._setEventListeners();
  };

};




// // ВАЛИДАЦИЯ ФОРМ
// const objForValidation = ({
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__button',
//   inactiveButtonClass: 'popup__button_disabled',
//   inputErrorClass: 'popup__input_type_error', //красная линия
//   errorClass: 'popup__input-error_active' //сообщение об ошибке
// });

// // Включение стилизации ошибок ввода
// function showInputError (formElement, inputElement, errorMessage, object) {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.add(object.inputErrorClass);
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add(object.errorClass);
// };

// // Выключение стилизации ошибок ввода
// function hideInputError (formElement, inputElement, object) {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.remove(object.inputErrorClass);
//   errorElement.classList.remove(object.errorClass);
//   errorElement.textContent = '';
// };

// // Проверка поля на валидность
// function checkInputValidity (formElement, inputElement, object) {
//   if (inputElement.validity.valid) {
//     hideInputError(formElement, inputElement, object);
//   } else {
//     showInputError(formElement, inputElement, inputElement.validationMessage, object);
//   }
// };

// // Добавляем обработчик всем полям формы
// function setEventListeners (formElement, object) {
//   const inputs = Array.from(formElement.querySelectorAll(object.inputSelector));
//   const buttonElement = formElement.querySelector(object.submitButtonSelector);
//   toggleButtonState(inputs, buttonElement, object);
//   inputs.forEach((inputElement) => {
//     inputElement.addEventListener('input', () => {
//       checkInputValidity(formElement, inputElement, object);
//       toggleButtonState(inputs, buttonElement, object);
//     });
//   });
// };

// // Проверка на валидность массива полей
// function hasInvalidInput (inputs) {
//   return inputs.some((inputElement) => {
//     return !inputElement.validity.valid;
//   })
// };

// // Переключение кнопки СОХРАНИТЬ с активной на неактивную и наоборот
// function toggleButtonState (inputs, buttonElement, object) {
//   if (hasInvalidInput(inputs)) {
//     buttonElement.setAttribute('disabled', true);
//     buttonElement.classList.add(object.inactiveButtonClass);
//   } else {
//     buttonElement.removeAttribute('disabled');
//     buttonElement.classList.remove(object.inactiveButtonClass);
//   }
// };

// // Добавляем обработчик всем формам
// function enableValidation (object) {
//   const forms = Array.from(document.querySelectorAll(object.formSelector));
//   forms.forEach((formElement) => {
//     formElement.addEventListener('submit', (evt) => {
//       evt.preventDefault();
//     });
//     setEventListeners(formElement, object);
//   });
// };
// enableValidation(objForValidation);
