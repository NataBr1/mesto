// ВАЛИДАЦИЯ ФОРМ
const objForValidation = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error', //красная линия
  errorClass: 'popup__input-error_active' //сообщение об ошибке
});

// Включение стилизации ошибок ввода
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(objForValidation.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(objForValidation.errorClass);
};

// Выключение стилизации ошибок ввода
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(objForValidation.inputErrorClass);
  errorElement.classList.remove(objForValidation.errorClass);
  errorElement.textContent = '';
};

// Проверка поля на валидность
const checkInputValidity = (formElement, inputElement) => {
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement);
  } else {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  }
};

// Добавляем обработчик всем полям формы
const setEventListeners = (formElement) => {
  const inputs = Array.from(formElement.querySelectorAll(objForValidation.inputSelector));
  const buttonElement = formElement.querySelector(objForValidation.submitButtonSelector);
  toggleButtonState(inputs, buttonElement);
  inputs.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputs, buttonElement);
    });
  });
};

// Проверка на валидность массива полей
const hasInvalidInput = (inputs) => {
  return inputs.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

// Переключение кнопки СОХРАНИТЬ с активной на неактивную и наоборот
const toggleButtonState = (inputs, buttonElement) => {
  if (hasInvalidInput(inputs)) {
    buttonElement.classList.add(objForValidation.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(objForValidation.inactiveButtonClass);
  }
};

// Добавляем обработчик всем формам
const enableValidation = () => {
  const forms = Array.from(document.querySelectorAll(objForValidation.formSelector));
  forms.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};
enableValidation();
